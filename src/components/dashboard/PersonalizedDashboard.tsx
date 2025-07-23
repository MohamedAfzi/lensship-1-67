import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  Target, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Zap,
  Star,
  Calendar,
  Bell,
  Settings,
  Gift
} from 'lucide-react';
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';

interface PersonalizedMetric {
  id: string;
  title: string;
  value: number;
  target: number;
  unit: string;
  color: string;
  description: string;
  trend: 'up' | 'down' | 'neutral';
  priority: 'high' | 'medium' | 'low';
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  earned: boolean;
  progress: number;
  target: number;
  reward: string;
}

interface SmartNotification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'achievement';
  title: string;
  message: string;
  timestamp: Date;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface PersonalizedDashboardProps {
  userId?: string;
  userName?: string;
}

const PersonalizedDashboard = ({ 
  userId = 'user-1', 
  userName = 'Abdullah' 
}: PersonalizedDashboardProps) => {
  const [activeGoals, setActiveGoals] = useState<PersonalizedMetric[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [notifications, setNotifications] = useState<SmartNotification[]>([]);
  const [showNotifications, setShowNotifications] = useState(true);

  // Mock personalized data based on user activity
  useEffect(() => {
    const mockGoals: PersonalizedMetric[] = [
      {
        id: 'daily-scans',
        title: 'Daily Scans',
        value: 23,
        target: 50,
        unit: 'scans',
        color: 'text-neon-blue',
        description: 'AI product scans completed today',
        trend: 'up',
        priority: 'high'
      },
      {
        id: 'weekly-revenue',
        title: 'Weekly Revenue',
        value: 1240,
        target: 2000,
        unit: 'YER',
        color: 'text-neon-green',
        description: 'Revenue generated this week',
        trend: 'up',
        priority: 'high'
      },
      {
        id: 'product-listings',
        title: 'Active Listings',
        value: 34,
        target: 50,
        unit: 'products',
        color: 'text-neon-purple',
        description: 'Products currently listed',
        trend: 'neutral',
        priority: 'medium'
      },
      {
        id: 'conversion-rate',
        title: 'Conversion Rate',
        value: 2.8,
        target: 5.0,
        unit: '%',
        color: 'text-neon-pink',
        description: 'Views to sales conversion',
        trend: 'up',
        priority: 'medium'
      }
    ];

    const mockAchievements: Achievement[] = [
      {
        id: 'first-scan',
        title: 'First Scan',
        description: 'Complete your first AI product scan',
        icon: Zap,
        earned: true,
        progress: 1,
        target: 1,
        reward: '50 bonus scans'
      },
      {
        id: 'scan-master',
        title: 'Scan Master',
        description: 'Complete 100 AI product scans',
        icon: Target,
        earned: false,
        progress: 67,
        target: 100,
        reward: 'Premium features for 1 week'
      },
      {
        id: 'revenue-milestone',
        title: 'Revenue Milestone',
        description: 'Generate $1000 in revenue',
        icon: TrendingUp,
        earned: false,
        progress: 640,
        target: 1000,
        reward: 'Custom dashboard theme'
      },
      {
        id: 'consistency-champion',
        title: 'Consistency Champion',
        description: 'Use the app for 30 consecutive days',
        icon: Calendar,
        earned: false,
        progress: 12,
        target: 30,
        reward: 'Advanced analytics access'
      }
    ];

    const mockNotifications: SmartNotification[] = [
      {
        id: 'n1',
        type: 'success',
        title: 'Goal Achieved!',
        message: 'You\'ve completed 50 scans this week. Keep up the great work!',
        timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
      },
      {
        id: 'n2',
        type: 'warning',
        title: 'Low Stock Alert',
        message: 'Wireless Headphones Pro is running low on inventory (3 left)',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
      },
      {
        id: 'n3',
        type: 'achievement',
        title: 'New Achievement Unlocked!',
        message: 'Scan Master - You\'re 67% of the way there!',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4) // 4 hours ago
      },
      {
        id: 'n4',
        type: 'info',
        title: 'Market Trend Alert',
        message: 'Electronics category showing 15% increase in demand',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6) // 6 hours ago
      }
    ];

    setActiveGoals(mockGoals);
    setAchievements(mockAchievements);
    setNotifications(mockNotifications);
  }, [userId]);

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const getNotificationIcon = (type: SmartNotification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-neon-green" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'achievement':
        return <Star className="h-4 w-4 text-neon-pink" />;
      case 'info':
        return <Bell className="h-4 w-4 text-neon-blue" />;
      default:
        return <Bell className="h-4 w-4 text-mobile-text-secondary" />;
    }
  };

  const PersonalizedGoalCard = ({ goal }: { goal: PersonalizedMetric }) => {
    const animatedValue = useAnimatedCounter({
      end: goal.value,
      duration: 1500,
      isActive: true
    });

    const progressPercentage = Math.min((goal.value / goal.target) * 100, 100);
    const isCompleted = goal.value >= goal.target;

    return (
      <Card className="bg-mobile-surface border-mobile-border hover:border-neon-blue/50 transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                goal.priority === 'high' ? 'bg-neon-green' :
                goal.priority === 'medium' ? 'bg-neon-blue' :
                'bg-mobile-text-secondary'
              }`} />
              <h3 className="text-sm font-medium text-mobile-text-primary">
                {goal.title}
              </h3>
            </div>
            {isCompleted && (
              <CheckCircle className="h-4 w-4 text-neon-green" />
            )}
          </div>
          
          <div className="space-y-2">
            <div className="flex items-baseline gap-1">
              <span className={`text-xl font-bold ${goal.color}`}>
                {animatedValue.toLocaleString()}
              </span>
              <span className="text-sm text-mobile-text-secondary">
                / {goal.target.toLocaleString()} {goal.unit}
              </span>
            </div>
            
            <Progress value={progressPercentage} className="h-2" />
            
            <p className="text-xs text-mobile-text-secondary">
              {goal.description}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  };

  const AchievementCard = ({ achievement }: { achievement: Achievement }) => {
    const IconComponent = achievement.icon;
    const progressPercentage = Math.min((achievement.progress / achievement.target) * 100, 100);

    return (
      <Card className={`bg-mobile-surface border-mobile-border transition-all duration-300 ${
        achievement.earned ? 'border-neon-green/50 bg-neon-green/5' : 'hover:border-neon-blue/50'
      }`}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              achievement.earned 
                ? 'bg-neon-green/20 border border-neon-green/30' 
                : 'bg-mobile-header border border-mobile-border'
            }`}>
              <IconComponent className={`h-5 w-5 ${
                achievement.earned ? 'text-neon-green' : 'text-mobile-text-secondary'
              }`} />
            </div>
            
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium text-mobile-text-primary">
                  {achievement.title}
                </h3>
                {achievement.earned && (
                  <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30 text-xs">
                    Earned
                  </Badge>
                )}
              </div>
              
              <p className="text-xs text-mobile-text-secondary">
                {achievement.description}
              </p>
              
              {!achievement.earned && (
                <>
                  <Progress value={progressPercentage} className="h-1.5" />
                  <div className="flex justify-between text-xs text-mobile-text-secondary">
                    <span>
                      {achievement.progress} / {achievement.target}
                    </span>
                    <span>
                      {Math.round(progressPercentage)}%
                    </span>
                  </div>
                </>
              )}
              
              <div className="flex items-center gap-1 text-xs text-neon-blue">
                <Gift className="h-3 w-3" />
                <span>{achievement.reward}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const SmartNotificationCard = ({ notification }: { notification: SmartNotification }) => {
    const handleDismiss = () => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    };

    return (
      <Card className="bg-mobile-surface border-mobile-border hover:border-neon-blue/50 transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5">
              {getNotificationIcon(notification.type)}
            </div>
            
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-mobile-text-primary">
                  {notification.title}
                </h3>
                <span className="text-xs text-mobile-text-secondary">
                  {formatTimeAgo(notification.timestamp)}
                </span>
              </div>
              
              <p className="text-xs text-mobile-text-secondary">
                {notification.message}
              </p>
              
              <div className="flex items-center gap-2 mt-2">
                {notification.action && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={notification.action.onClick}
                    className="h-6 px-2 text-xs border-mobile-border hover:bg-mobile-surface"
                  >
                    {notification.action.label}
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleDismiss}
                  className="h-6 px-2 text-xs text-mobile-text-secondary hover:text-mobile-text-primary"
                >
                  Dismiss
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Personal Welcome */}
      <Card className="bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 border-neon-blue/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-neon-blue/20 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-neon-blue" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-mobile-text-primary">
                  Welcome back, {userName}!
                </h2>
                <p className="text-mobile-text-secondary">
                  You're on track to achieve your goals. Keep up the momentum!
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="border-mobile-border hover:bg-mobile-surface">
              <Settings className="h-4 w-4 mr-2" />
              Customize
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Personal Goals */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-mobile-text-primary">
            Your Goals
          </h3>
          <Button variant="ghost" size="sm" className="text-neon-blue hover:text-neon-blue/80">
            View All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeGoals.map((goal) => (
            <PersonalizedGoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-mobile-text-primary">
            Achievements
          </h3>
          <Badge className="bg-neon-pink/20 text-neon-pink border-neon-pink/30">
            {achievements.filter(a => a.earned).length} / {achievements.length}
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </div>

      {/* Smart Notifications */}
      {showNotifications && notifications.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-mobile-text-primary">
              Smart Notifications
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowNotifications(false)}
              className="text-mobile-text-secondary hover:text-mobile-text-primary"
            >
              Hide All
            </Button>
          </div>
          
          <div className="space-y-3">
            {notifications.slice(0, 3).map((notification) => (
              <SmartNotificationCard key={notification.id} notification={notification} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalizedDashboard;