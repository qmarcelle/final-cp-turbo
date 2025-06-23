import React, { useState } from 'react';
import { DesignSystemCategory } from '../../../config/design-system.config';
import { Icon } from '../Icons/Icons';

interface DesignSystemNavProps {
  categories: DesignSystemCategory[];
  onSelect?: (path: string) => void;
}

interface NavItemProps {
  category: DesignSystemCategory;
  level?: number;
  onSelect?: (path: string) => void;
}

const NavItem: React.FC<NavItemProps> = ({ category, level = 0, onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = category.children && category.children.length > 0;

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
    if (onSelect) {
      onSelect(category.path);
    }
  };

  return (
    <div className={`pl-${level * 4}`}>
      <button
        onClick={handleClick}
        className="flex items-center w-full p-2 hover:bg-gray-100 rounded"
      >
        {hasChildren && (
          <Icon
            name={isExpanded ? 'chevronDown' : 'chevronRight'}
            className="w-4 h-4 mr-2"
          />
        )}
        {category.icon && (
          <Icon name={category.icon} className="w-5 h-5 mr-2" />
        )}
        <span className="text-sm font-medium">{category.name}</span>
      </button>
      
      {isExpanded && hasChildren && (
        <div className="ml-4">
          {category.children?.map((child) => (
            <NavItem
              key={child.path}
              category={child}
              level={level + 1}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const DesignSystemNav: React.FC<DesignSystemNavProps> = ({
  categories,
  onSelect,
}) => {
  return (
    <nav className="w-64 bg-white border-r">
      <div className="p-4">
        {categories.map((category) => (
          <NavItem
            key={category.path}
            category={category}
            onSelect={onSelect}
          />
        ))}
      </div>
    </nav>
  );
}; 