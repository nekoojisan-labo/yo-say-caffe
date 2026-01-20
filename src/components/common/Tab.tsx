import { ReactNode, useState } from 'react';

interface TabItem {
  id: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}

interface TabProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

const variantStyles = {
  default: {
    container: 'bg-fairy-lavender-100 rounded-xl p-1',
    tab: 'rounded-lg',
    active: 'bg-white shadow-soft',
    inactive: 'hover:bg-white/50',
  },
  pills: {
    container: 'gap-2',
    tab: 'rounded-full border border-transparent',
    active: 'bg-fairy-pink-200 text-white border-fairy-pink-300',
    inactive: 'bg-white border-fairy-pink-100 hover:border-fairy-pink-200',
  },
  underline: {
    container: 'border-b border-gray-200',
    tab: '',
    active: 'border-b-2 border-fairy-pink-300 text-fairy-pink-500',
    inactive: 'text-gray-500 hover:text-gray-700',
  },
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export function Tab({
  tabs,
  activeTab,
  onTabChange,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  className = '',
}: TabProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={`
        flex items-center ${styles.container}
        ${fullWidth ? 'w-full' : 'inline-flex'}
        ${className}
      `}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => !tab.disabled && onTabChange(tab.id)}
          disabled={tab.disabled}
          className={`
            flex items-center justify-center gap-2 font-medium
            transition-all duration-200
            ${sizeStyles[size]}
            ${styles.tab}
            ${tab.id === activeTab ? styles.active : styles.inactive}
            ${fullWidth ? 'flex-1' : ''}
            ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          {tab.icon && <span>{tab.icon}</span>}
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}

// タブコンテンツを含む完全なタブコンポーネント
interface TabPanelProps {
  tabs: (TabItem & { content: ReactNode })[];
  defaultTab?: string;
  variant?: 'default' | 'pills' | 'underline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  contentClassName?: string;
}

export function TabPanel({
  tabs,
  defaultTab,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  className = '',
  contentClassName = '',
}: TabPanelProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || '');

  const activeContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className={className}>
      <Tab
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        variant={variant}
        size={size}
        fullWidth={fullWidth}
      />
      <div className={`mt-4 ${contentClassName}`}>{activeContent}</div>
    </div>
  );
}
