import { useState } from 'react';
import { Download, FileText, FileSpreadsheet, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { InventoryMetrics } from '@/hooks/useInventoryCalculations';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

interface InventoryExportProps {
  metrics: InventoryMetrics;
  dashboardRef: React.RefObject<HTMLDivElement>;
}

export const InventoryExport = ({ metrics, dashboardRef }: InventoryExportProps) => {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const formatCurrency = (value: number) => 
    `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const exportToPDF = async () => {
    if (!dashboardRef.current) return;
    
    setIsExporting(true);
    try {
      const canvas = await html2canvas(dashboardRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#000000'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      // Add title and metadata
      pdf.setFontSize(20);
      pdf.text('Inventory Value Summary', 20, 20);
      
      pdf.setFontSize(12);
      pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);
      pdf.text(`Total Inventory Value: ${formatCurrency(metrics.totalValue)}`, 20, 40);
      pdf.text(`Total Items: ${metrics.totalItems.toLocaleString()}`, 20, 50);

      // Add dashboard image
      const imgWidth = 250;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 20, 60, imgWidth, Math.min(imgHeight, 150));

      // Add summary data on next page if needed
      if (imgHeight > 150) {
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 20, 20, imgWidth, imgHeight - 150);
      }

      // Add top products summary
      pdf.addPage();
      pdf.setFontSize(16);
      pdf.text('Top Value Products', 20, 20);
      
      pdf.setFontSize(10);
      let yPos = 35;
      metrics.topValueProducts.forEach((product, index) => {
        const productValue = product.price * product.stockQuantity;
        pdf.text(
          `${index + 1}. ${product.name} - ${formatCurrency(productValue)} (${product.stockQuantity} units)`,
          20,
          yPos
        );
        yPos += 8;
      });

      pdf.save(`inventory-summary-${new Date().toISOString().split('T')[0]}.pdf`);
      
      toast({
        title: "PDF Export Complete",
        description: "Inventory summary has been downloaded successfully.",
      });
    } catch (error) {
      console.error('PDF export error:', error);
      toast({
        title: "Export Failed",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const exportToExcel = () => {
    setIsExporting(true);
    try {
      const workbook = XLSX.utils.book_new();

      // Summary Sheet
      const summaryData = [
        ['Inventory Value Summary', ''],
        ['Generated on:', new Date().toLocaleDateString()],
        ['', ''],
        ['Metric', 'Value'],
        ['Total Inventory Value', metrics.totalValue],
        ['Total Items', metrics.totalItems],
        ['Average Item Value', metrics.averageItemValue],
        ['Published Value', metrics.publishedValue],
        ['Out of Stock Value', metrics.outOfStockValue],
        ['Stock Turnover Rate', `${(metrics.stockTurnoverRate * 100).toFixed(1)}%`],
      ];
      
      const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
      
      // Format currency columns
      summarySheet['B5'] = { t: 'n', v: metrics.totalValue, z: '"$"#,##0.00' };
      summarySheet['B7'] = { t: 'n', v: metrics.averageItemValue, z: '"$"#,##0.00' };
      summarySheet['B8'] = { t: 'n', v: metrics.publishedValue, z: '"$"#,##0.00' };
      summarySheet['B9'] = { t: 'n', v: metrics.outOfStockValue, z: '"$"#,##0.00' };
      
      XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');

      // Top Products Sheet
      const topProductsData = [
        ['Top Value Products', '', '', ''],
        ['Product Name', 'Price', 'Stock Quantity', 'Total Value'],
        ...metrics.topValueProducts.map(product => [
          product.name,
          product.price,
          product.stockQuantity,
          product.price * product.stockQuantity
        ])
      ];
      
      const topProductsSheet = XLSX.utils.aoa_to_sheet(topProductsData);
      XLSX.utils.book_append_sheet(workbook, topProductsSheet, 'Top Products');

      // Category Breakdown Sheet
      const categoryData = [
        ['Category Breakdown', '', '', ''],
        ['Category', 'Value', 'Count', 'Percentage'],
        ...metrics.categoryBreakdown.map(cat => [
          cat.category,
          cat.value,
          cat.count,
          `${cat.percentage.toFixed(1)}%`
        ])
      ];
      
      const categorySheet = XLSX.utils.aoa_to_sheet(categoryData);
      XLSX.utils.book_append_sheet(workbook, categorySheet, 'Categories');

      // Low Stock Alert Sheet
      if (metrics.lowStockProducts.length > 0) {
        const lowStockData = [
          ['Low Stock Alert', '', '', ''],
          ['Product Name', 'Stock Quantity', 'Price', 'Store'],
          ...metrics.lowStockProducts.map(product => [
            product.name,
            product.stockQuantity,
            product.price,
            product.storeName
          ])
        ];
        
        const lowStockSheet = XLSX.utils.aoa_to_sheet(lowStockData);
        XLSX.utils.book_append_sheet(workbook, lowStockSheet, 'Low Stock');
      }

      XLSX.writeFile(workbook, `inventory-summary-${new Date().toISOString().split('T')[0]}.xlsx`);
      
      toast({
        title: "Excel Export Complete",
        description: "Inventory data has been downloaded successfully.",
      });
    } catch (error) {
      console.error('Excel export error:', error);
      toast({
        title: "Export Failed",
        description: "Failed to generate Excel file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={isExporting}>
          {isExporting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Download className="mr-2 h-4 w-4" />
          )}
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={exportToPDF} disabled={isExporting}>
          <FileText className="mr-2 h-4 w-4" />
          Export as PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToExcel} disabled={isExporting}>
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          Export as Excel
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};