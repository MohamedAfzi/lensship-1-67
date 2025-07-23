export interface CategoryConfig {
  label: string;
  subcategories: {
    [key: string]: {
      label: string;
      sizeOptions?: string[];
      colorOptions?: string[];
      attributes?: {
        [key: string]: {
          label: string;
          type: 'text' | 'select' | 'number';
          options?: string[];
          required?: boolean;
        };
      };
    };
  };
}

export const CATEGORIES: { [key: string]: CategoryConfig } = {
  tools: {
    label: 'Tools',
    subcategories: {
      handTools: {
        label: 'Hand Tools',
        sizeOptions: ['Small', 'Medium', 'Large', 'Set'],
        colorOptions: ['Black', 'Red', 'Blue', 'Yellow', 'Silver', 'Green'],
        attributes: {
          brand: { label: 'Brand', type: 'text', required: true },
          toolType: { label: 'Tool Type', type: 'select', options: ['Hammer', 'Screwdriver', 'Wrench', 'Pliers', 'Other'], required: true },
          material: { label: 'Material', type: 'select', options: ['Steel', 'Chrome', 'Aluminum', 'Carbon Steel'] },
          warranty: { label: 'Warranty', type: 'text' }
        }
      },
      powerTools: {
        label: 'Power Tools',
        sizeOptions: ['Compact', 'Standard', 'Heavy Duty'],
        colorOptions: ['Black', 'Red', 'Blue', 'Yellow', 'Green'],
        attributes: {
          brand: { label: 'Brand', type: 'text', required: true },
          powerSource: { label: 'Power Source', type: 'select', options: ['Corded', 'Cordless', 'Pneumatic'], required: true },
          voltage: { label: 'Voltage', type: 'select', options: ['12V', '18V', '20V', '24V', '110V', '220V'] },
          warranty: { label: 'Warranty', type: 'text' }
        }
      },
      gardening: {
        label: 'Gardening Tools',
        sizeOptions: ['Small', 'Medium', 'Large'],
        colorOptions: ['Green', 'Black', 'Brown', 'Red', 'Blue'],
        attributes: {
          toolType: { label: 'Tool Type', type: 'select', options: ['Shovel', 'Rake', 'Hoe', 'Pruners', 'Watering', 'Other'], required: true },
          material: { label: 'Handle Material', type: 'select', options: ['Wood', 'Fiberglass', 'Steel', 'Plastic'] },
          season: { label: 'Best Season', type: 'select', options: ['Spring', 'Summer', 'Fall', 'Winter', 'All Season'] }
        }
      }
    }
  },
  furniture: {
    label: 'Furniture',
    subcategories: {
      livingRoom: {
        label: 'Living Room',
        sizeOptions: ['Small', 'Medium', 'Large', 'Loveseat', '3-Seater', 'Sectional'],
        colorOptions: ['Black', 'White', 'Brown', 'Gray', 'Beige', 'Blue', 'Green'],
        attributes: {
          material: { label: 'Material', type: 'select', options: ['Leather', 'Fabric', 'Wood', 'Metal', 'Glass'], required: true },
          style: { label: 'Style', type: 'select', options: ['Modern', 'Traditional', 'Contemporary', 'Rustic', 'Industrial'] },
          assembly: { label: 'Assembly Required', type: 'select', options: ['Yes', 'No'] },
          dimensions: { label: 'Dimensions', type: 'text' }
        }
      },
      bedroom: {
        label: 'Bedroom',
        sizeOptions: ['Twin', 'Full', 'Queen', 'King', 'California King'],
        colorOptions: ['White', 'Black', 'Brown', 'Gray', 'Natural Wood'],
        attributes: {
          furnitureType: { label: 'Type', type: 'select', options: ['Bed Frame', 'Mattress', 'Dresser', 'Nightstand', 'Wardrobe'], required: true },
          material: { label: 'Material', type: 'select', options: ['Wood', 'Metal', 'Upholstered', 'Composite'] },
          assembly: { label: 'Assembly Required', type: 'select', options: ['Yes', 'No'] }
        }
      },
      office: {
        label: 'Office Furniture',
        sizeOptions: ['Small', 'Medium', 'Large', 'Executive'],
        colorOptions: ['Black', 'White', 'Brown', 'Gray', 'Silver'],
        attributes: {
          furnitureType: { label: 'Type', type: 'select', options: ['Desk', 'Chair', 'Bookshelf', 'Filing Cabinet', 'Conference Table'], required: true },
          material: { label: 'Material', type: 'select', options: ['Wood', 'Metal', 'Glass', 'Composite'] },
          ergonomic: { label: 'Ergonomic', type: 'select', options: ['Yes', 'No'] }
        }
      }
    }
  },
  garden: {
    label: 'Garden',
    subcategories: {
      plants: {
        label: 'Plants & Seeds',
        sizeOptions: ['Small Pot', 'Medium Pot', 'Large Pot', 'Seedling', 'Mature'],
        colorOptions: ['Green', 'Red', 'Pink', 'White', 'Purple', 'Yellow', 'Mixed'],
        attributes: {
          plantType: { label: 'Plant Type', type: 'select', options: ['Indoor', 'Outdoor', 'Succulent', 'Flowering', 'Vegetable', 'Herb'], required: true },
          careLevel: { label: 'Care Level', type: 'select', options: ['Easy', 'Moderate', 'Difficult'] },
          sunlight: { label: 'Sunlight Needs', type: 'select', options: ['Full Sun', 'Partial Sun', 'Shade'] },
          season: { label: 'Growing Season', type: 'select', options: ['Spring', 'Summer', 'Fall', 'Winter', 'Year Round'] }
        }
      },
      outdoor: {
        label: 'Outdoor Equipment',
        sizeOptions: ['Small', 'Medium', 'Large', 'Commercial'],
        colorOptions: ['Green', 'Black', 'Red', 'Blue', 'Yellow'],
        attributes: {
          equipmentType: { label: 'Equipment Type', type: 'select', options: ['Lawn Mower', 'Trimmer', 'Blower', 'Chainsaw', 'Other'], required: true },
          powerSource: { label: 'Power Source', type: 'select', options: ['Gas', 'Electric', 'Battery', 'Manual'] },
          brand: { label: 'Brand', type: 'text' }
        }
      }
    }
  },
  appliances: {
    label: 'Appliances',
    subcategories: {
      kitchen: {
        label: 'Kitchen Appliances',
        sizeOptions: ['Compact', 'Standard', 'Large', 'Commercial'],
        colorOptions: ['White', 'Black', 'Stainless Steel', 'Silver', 'Red'],
        attributes: {
          applianceType: { label: 'Appliance Type', type: 'select', options: ['Refrigerator', 'Oven', 'Microwave', 'Dishwasher', 'Coffee Maker', 'Other'], required: true },
          brand: { label: 'Brand', type: 'text', required: true },
          energyRating: { label: 'Energy Rating', type: 'select', options: ['A+++', 'A++', 'A+', 'A', 'B', 'C', 'D'] },
          capacity: { label: 'Capacity', type: 'text' }
        }
      },
      laundry: {
        label: 'Laundry',
        sizeOptions: ['Compact', 'Standard', 'Large Capacity'],
        colorOptions: ['White', 'Black', 'Silver', 'Gray'],
        attributes: {
          applianceType: { label: 'Type', type: 'select', options: ['Washer', 'Dryer', 'Washer/Dryer Combo'], required: true },
          loadType: { label: 'Load Type', type: 'select', options: ['Top Load', 'Front Load'] },
          capacity: { label: 'Capacity (lbs)', type: 'number' },
          energyRating: { label: 'Energy Rating', type: 'select', options: ['A+++', 'A++', 'A+', 'A', 'B', 'C', 'D'] }
        }
      }
    }
  },
  household: {
    label: 'Household',
    subcategories: {
      cleaning: {
        label: 'Cleaning Supplies',
        sizeOptions: ['Small', 'Medium', 'Large', 'Bulk'],
        colorOptions: ['White', 'Blue', 'Green', 'Yellow', 'Clear'],
        attributes: {
          productType: { label: 'Product Type', type: 'select', options: ['All-Purpose', 'Kitchen', 'Bathroom', 'Floor', 'Glass', 'Laundry'], required: true },
          brand: { label: 'Brand', type: 'text' },
          scent: { label: 'Scent', type: 'select', options: ['Unscented', 'Lemon', 'Lavender', 'Pine', 'Fresh', 'Other'] }
        }
      },
      storage: {
        label: 'Storage & Organization',
        sizeOptions: ['Small', 'Medium', 'Large', 'Extra Large'],
        colorOptions: ['Clear', 'White', 'Black', 'Gray', 'Blue', 'Red'],
        attributes: {
          storageType: { label: 'Storage Type', type: 'select', options: ['Plastic Bins', 'Baskets', 'Shelving', 'Closet Organizers', 'Other'], required: true },
          material: { label: 'Material', type: 'select', options: ['Plastic', 'Fabric', 'Metal', 'Wood', 'Wire'] },
          stackable: { label: 'Stackable', type: 'select', options: ['Yes', 'No'] }
        }
      }
    }
  },
  entertainment: {
    label: 'Entertainment',
    subcategories: {
      books: {
        label: 'Books',
        sizeOptions: ['Paperback', 'Hardcover', 'Large Print'],
        colorOptions: ['Various'],
        attributes: {
          genre: { label: 'Genre', type: 'select', options: ['Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Science Fiction', 'Biography', 'Self Help', 'Other'], required: true },
          author: { label: 'Author', type: 'text' },
          language: { label: 'Language', type: 'select', options: ['English', 'Spanish', 'French', 'Arabic', 'Other'] },
          year: { label: 'Publication Year', type: 'number' }
        }
      },
      movies: {
        label: 'Movies & TV',
        sizeOptions: ['DVD', 'Blu-ray', '4K', 'Digital'],
        colorOptions: ['Various'],
        attributes: {
          format: { label: 'Format', type: 'select', options: ['DVD', 'Blu-ray', '4K UHD', 'VHS', 'Digital'], required: true },
          genre: { label: 'Genre', type: 'select', options: ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Documentary', 'Kids', 'Other'] },
          rating: { label: 'Rating', type: 'select', options: ['G', 'PG', 'PG-13', 'R', 'NR'] },
          year: { label: 'Release Year', type: 'number' }
        }
      },
      music: {
        label: 'Music',
        sizeOptions: ['CD', 'Vinyl', 'Cassette', 'Digital'],
        colorOptions: ['Various'],
        attributes: {
          format: { label: 'Format', type: 'select', options: ['CD', 'Vinyl', 'Cassette', 'Digital'], required: true },
          genre: { label: 'Genre', type: 'select', options: ['Rock', 'Pop', 'Hip Hop', 'Country', 'Classical', 'Jazz', 'Electronic', 'Other'] },
          artist: { label: 'Artist', type: 'text' },
          year: { label: 'Release Year', type: 'number' }
        }
      }
    }
  },
  clothingAccessories: {
    label: 'Clothing & Accessories',
    subcategories: {
      menClothing: {
        label: "Men's Clothing",
        sizeOptions: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '2XL', '3XL'],
        colorOptions: ['Black', 'White', 'Gray', 'Navy', 'Blue', 'Red', 'Green', 'Brown'],
        attributes: {
          clothingType: { label: 'Clothing Type', type: 'select', options: ['Shirts', 'Pants', 'Suits', 'Jackets', 'Shorts', 'Underwear', 'Other'], required: true },
          brand: { label: 'Brand', type: 'text' },
          fit: { label: 'Fit', type: 'select', options: ['Slim', 'Regular', 'Relaxed'] },
          season: { label: 'Season', type: 'select', options: ['Spring', 'Summer', 'Fall', 'Winter', 'All Season'] }
        }
      },
      womenClothing: {
        label: "Women's Clothing",
        sizeOptions: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '2XL', '3XL'],
        colorOptions: ['Black', 'White', 'Gray', 'Navy', 'Blue', 'Red', 'Pink', 'Green', 'Purple'],
        attributes: {
          clothingType: { label: 'Clothing Type', type: 'select', options: ['Dresses', 'Tops', 'Pants', 'Skirts', 'Jackets', 'Lingerie', 'Other'], required: true },
          brand: { label: 'Brand', type: 'text' },
          fit: { label: 'Fit', type: 'select', options: ['Slim', 'Regular', 'Relaxed'] },
          season: { label: 'Season', type: 'select', options: ['Spring', 'Summer', 'Fall', 'Winter', 'All Season'] }
        }
      },
      accessories: {
        label: 'Accessories',
        sizeOptions: ['One Size', 'Small', 'Medium', 'Large'],
        colorOptions: ['Black', 'Brown', 'Tan', 'White', 'Silver', 'Gold', 'Red', 'Blue'],
        attributes: {
          accessoryType: { label: 'Accessory Type', type: 'select', options: ['Bags', 'Jewelry', 'Watches', 'Belts', 'Hats', 'Sunglasses', 'Other'], required: true },
          brand: { label: 'Brand', type: 'text' },
          material: { label: 'Material', type: 'select', options: ['Leather', 'Fabric', 'Metal', 'Plastic', 'Wood', 'Other'] }
        }
      }
    }
  },
  family: {
    label: 'Family',
    subcategories: {
      babyItems: {
        label: 'Baby & Toddler',
        sizeOptions: ['Newborn', '0-3m', '3-6m', '6-12m', '12-18m', '18-24m', '2T', '3T'],
        colorOptions: ['Pink', 'Blue', 'Yellow', 'Green', 'White', 'Purple', 'Red'],
        attributes: {
          itemType: { label: 'Item Type', type: 'select', options: ['Clothing', 'Toys', 'Feeding', 'Safety', 'Furniture', 'Strollers', 'Car Seats'], required: true },
          ageRange: { label: 'Age Range', type: 'select', options: ['0-6 months', '6-12 months', '1-2 years', '2-3 years'], required: true },
          brand: { label: 'Brand', type: 'text' },
          safetyRating: { label: 'Safety Certified', type: 'select', options: ['Yes', 'No'] }
        }
      },
      kidsItems: {
        label: 'Kids & Teens',
        sizeOptions: ['4T', '5T', '6', '7', '8', '10', '12', '14', '16'],
        colorOptions: ['Blue', 'Pink', 'Red', 'Green', 'Purple', 'Yellow', 'Black', 'White'],
        attributes: {
          itemType: { label: 'Item Type', type: 'select', options: ['Clothing', 'Toys', 'Games', 'Sports', 'Electronics', 'Books', 'Other'], required: true },
          ageRange: { label: 'Age Range', type: 'select', options: ['3-5 years', '6-8 years', '9-12 years', '13+ years'], required: true },
          brand: { label: 'Brand', type: 'text' }
        }
      }
    }
  },
  electronics: {
    label: 'Electronics',
    subcategories: {
      smartphones: {
        label: 'Smartphones',
        sizeOptions: ['64GB', '128GB', '256GB', '512GB', '1TB'],
        colorOptions: ['Black', 'White', 'Gray', 'Blue', 'Red', 'Green', 'Purple', 'Gold'],
        attributes: {
          brand: { label: 'Brand', type: 'text', required: true },
          model: { label: 'Model', type: 'text', required: true },
          storage: { label: 'Storage', type: 'select', options: ['64GB', '128GB', '256GB', '512GB', '1TB'], required: true },
          carrier: { label: 'Carrier', type: 'select', options: ['Unlocked', 'Verizon', 'AT&T', 'T-Mobile', 'Other'] }
        }
      },
      computers: {
        label: 'Computers & Laptops',
        sizeOptions: ['11"', '13"', '14"', '15"', '16"', '17"'],
        colorOptions: ['Black', 'Silver', 'White', 'Gray', 'Gold'],
        attributes: {
          computerType: { label: 'Type', type: 'select', options: ['Laptop', 'Desktop', 'Tablet'], required: true },
          brand: { label: 'Brand', type: 'text', required: true },
          processor: { label: 'Processor', type: 'text' },
          ram: { label: 'RAM', type: 'select', options: ['4GB', '8GB', '16GB', '32GB', '64GB'] },
          storage: { label: 'Storage', type: 'select', options: ['128GB', '256GB', '512GB', '1TB', '2TB'] }
        }
      },
      audio: {
        label: 'Audio & Video',
        sizeOptions: ['Portable', 'Bookshelf', 'Floor Standing', 'In-ear', 'Over-ear'],
        colorOptions: ['Black', 'White', 'Silver', 'Blue', 'Red'],
        attributes: {
          audioType: { label: 'Audio Type', type: 'select', options: ['Headphones', 'Speakers', 'Sound Systems', 'Microphones'], required: true },
          connectivity: { label: 'Connectivity', type: 'select', options: ['Wired', 'Bluetooth', 'WiFi', 'Both'] },
          brand: { label: 'Brand', type: 'text' }
        }
      }
    }
  },
  hobbies: {
    label: 'Hobbies',
    subcategories: {
      sports: {
        label: 'Sports Equipment',
        sizeOptions: ['Youth', 'Adult', 'Professional', 'One Size'],
        colorOptions: ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow'],
        attributes: {
          sport: { label: 'Sport', type: 'select', options: ['Basketball', 'Football', 'Soccer', 'Tennis', 'Golf', 'Baseball', 'Other'], required: true },
          brand: { label: 'Brand', type: 'text' },
          skillLevel: { label: 'Skill Level', type: 'select', options: ['Beginner', 'Intermediate', 'Advanced', 'Professional'] }
        }
      },
      arts: {
        label: 'Arts & Crafts',
        sizeOptions: ['Small', 'Medium', 'Large', 'Set'],
        colorOptions: ['Various', 'Black', 'White', 'Red', 'Blue', 'Green'],
        attributes: {
          craftType: { label: 'Craft Type', type: 'select', options: ['Painting', 'Drawing', 'Sewing', 'Knitting', 'Scrapbooking', 'Other'], required: true },
          skillLevel: { label: 'Skill Level', type: 'select', options: ['Beginner', 'Intermediate', 'Advanced'] },
          brand: { label: 'Brand', type: 'text' }
        }
      }
    }
  },
  classifieds: {
    label: 'Classifieds',
    subcategories: {
      services: {
        label: 'Services',
        sizeOptions: ['Hourly', 'Daily', 'Weekly', 'Monthly', 'One-time'],
        colorOptions: ['N/A'],
        attributes: {
          serviceType: { label: 'Service Type', type: 'select', options: ['Cleaning', 'Tutoring', 'Pet Care', 'Handyman', 'Transportation', 'Other'], required: true },
          availability: { label: 'Availability', type: 'select', options: ['Weekdays', 'Weekends', 'Evenings', 'Flexible'] },
          experience: { label: 'Years of Experience', type: 'number' }
        }
      },
      other: {
        label: 'Other',
        sizeOptions: ['Small', 'Medium', 'Large', 'Various'],
        colorOptions: ['Various'],
        attributes: {
          itemType: { label: 'Item Type', type: 'text', required: true },
          description: { label: 'Additional Details', type: 'text' }
        }
      }
    }
  }
};

export const getSubcategories = (category: string) => {
  return CATEGORIES[category]?.subcategories || {};
};

export const getSizeOptions = (category: string, subcategory: string) => {
  const subcategoryConfig = CATEGORIES[category]?.subcategories[subcategory];
  return subcategoryConfig?.sizeOptions || ['Small', 'Medium', 'Large'];
};

export const getColorOptions = (category: string, subcategory: string) => {
  const subcategoryConfig = CATEGORIES[category]?.subcategories[subcategory];
  return subcategoryConfig?.colorOptions || ['Black', 'White', 'Gray', 'Red', 'Blue', 'Green'];
};

export const getAttributes = (category: string, subcategory: string) => {
  const subcategoryConfig = CATEGORIES[category]?.subcategories[subcategory];
  return subcategoryConfig?.attributes || {};
};