'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../atoms/DropdownMenu/DropdownMenu';
import { Button } from '../atoms/Button/Button';
import { Avatar, AvatarImage, AvatarFallback } from '../atoms/Avatar/Avatar';
import { Check, ChevronsUpDown, PlusCircle, Users } from 'lucide-react';

const userSwitcherVariants = cva(
  'w-full',
  {
    variants: {
      variant: {
        default: '',
        compact: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  avatarUrl?: string;
}

export interface UserSwitcherProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof userSwitcherVariants> {
  users: User[];
  currentUser: User;
  onUserChange: (user: User) => void;
  onAddUser?: () => void;
  onManageUsers?: () => void;
}

const UserSwitcher = React.forwardRef<HTMLDivElement, UserSwitcherProps>(
  ({
    className,
    variant,
    users,
    currentUser,
    onUserChange,
    onAddUser,
    onManageUsers,
    ...props
  }, ref) => {
    const [open, setOpen] = React.useState(false);

    return (
      <div
        ref={ref}
        className={cn(userSwitcherVariants({ variant }), className)}
        {...props}
      >
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              aria-label="Select a user"
              className={cn(
                'w-full justify-between',
                variant === 'compact' ? 'h-9 px-2' : 'px-3'
              )}
            >
              <div className="flex items-center gap-2">
                <Avatar className={cn(
                  variant === 'compact' ? 'h-5 w-5' : 'h-6 w-6'
                )}>
                  <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                  <AvatarFallback name={currentUser.name} />
                </Avatar>
                <div className="flex flex-col items-start">
                  <span className={cn(
                    'font-medium',
                    variant === 'compact' ? 'text-sm' : 'text-base'
                  )}>
                    {currentUser.name}
                  </span>
                  {variant !== 'compact' && currentUser.role && (
                    <span className="text-xs text-muted-foreground">
                      {currentUser.role}
                    </span>
                  )}
                </div>
              </div>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[--radix-dropdown-trigger-width]">
            <DropdownMenuLabel>Switch Account</DropdownMenuLabel>
            {users.map((user) => (
              <DropdownMenuItem
                key={user.id}
                onSelect={() => {
                  onUserChange(user);
                  setOpen(false);
                }}
              >
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback name={user.name} />
                    </Avatar>
                    <div className="flex flex-col">
                      <span>{user.name}</span>
                      {user.role && (
                        <span className="text-xs text-muted-foreground">
                          {user.role}
                        </span>
                      )}
                    </div>
                  </div>
                  {user.id === currentUser.id && (
                    <Check className="h-4 w-4" />
                  )}
                </div>
              </DropdownMenuItem>
            ))}
            {(onAddUser || onManageUsers) && (
              <DropdownMenuSeparator />
            )}
            {onAddUser && (
              <DropdownMenuItem onSelect={onAddUser}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Account
              </DropdownMenuItem>
            )}
            {onManageUsers && (
              <DropdownMenuItem onSelect={onManageUsers}>
                <Users className="mr-2 h-4 w-4" />
                Manage Accounts
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
);

UserSwitcher.displayName = 'UserSwitcher';

export { UserSwitcher }; 