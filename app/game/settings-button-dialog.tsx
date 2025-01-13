import React, { ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { ButtonProps } from "@/components/ui/button";

const SettingsButtonDialog = ({
  children,
  title = "متأكد|ة ؟",
  description = "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
  action,
  cancelLabel = "Cancel",
  actionLabel = "Continue",
  variant = "destructive",
  actionProps,
}: {
  children: ReactNode;
  title?: string;
  description?: string;
  cancelLabel?: string;
  actionLabel?: string;
} & (
  | {
      actionProps?: never;
      variant?: ButtonProps["variant"];
      action: () => void;
    }
  | {
      actionProps: Parameters<typeof AlertDialogAction>[0];
      variant?: never;
      action?: never;
    }
)) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className={"gap-2"}>
          <AlertDialogAction
            variant={variant}
            onClick={action}
            {...actionProps}
          >
            {actionLabel}
          </AlertDialogAction>
          <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SettingsButtonDialog;
