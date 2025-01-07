import { 
  LayoutDashboard,
  FileText,
  ImagePlus,
  Crown,
  Settings,
  User,
  History
} from 'lucide-react';

export const NOTIFICATION_EXAMPLES = [
  {
    id: 1,
    type: 'success',
    title: 'Text Generated',
    message: 'Your text has been generated successfully',
    time: '2 min ago',
    read: false
  },
  {
    id: 2,
    type: 'info',
    title: 'Daily Limit Updated',
    message: 'Your generation limits have been reset',
    time: '1 hour ago',
    read: false
  }
];

export const getMenuItems = (unreadCount) => [
  {
    title: 'Overview',
    items: [
      {
        name: 'Dashboard',
        icon: LayoutDashboard,
        path: '/dashboard',
        badge: unreadCount > 0 ? unreadCount.toString() : null
      }
    ]
  },
  {
    title: 'AI Tools',
    items: [
      {
        name: 'Text Generation',
        icon: FileText,
        path: '/ai-writer',
        badge: 'Pro'
      },
      {
        name: 'Image Generation',
        icon: ImagePlus,
        path: '/ai-image',
        badge: 'Pro'
      }
    ]
  },
  {
    title: 'History',
    items: [
      {
        name: 'Generated Content',
        icon: History,
        path: '/history'
      }
    ]
  },
  {
    title: 'Account',
    items: [
      {
        name: 'Profile',
        icon: User,
        path: '/profile'
      },
      {
        name: 'Settings',
        icon: Settings,
        path: '/settings'
      },
      {
        name: 'Upgrade to Pro',
        icon: Crown,
        path: '/upgrade',
        badge: 'Special',
        highlight: true
      }
    ]
  }
];