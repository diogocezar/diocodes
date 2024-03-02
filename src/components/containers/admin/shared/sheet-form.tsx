import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type SheetFormProps = {
  isOpenForm: boolean;
  setIsOpenForm: (open: boolean) => void;
  title: string;
  Icon: JSX.Element;
  children: React.ReactNode;
};

export function SheetForm({
  isOpenForm,
  setIsOpenForm,
  title,
  Icon,
  children,
}: SheetFormProps) {
  return (
    <Sheet open={isOpenForm} onOpenChange={setIsOpenForm}>
      <SheetContent className="flex flex-col justify-center">
        <SheetHeader>
          <SheetTitle className="flex flex-row items-center gap-2 rounded-lg">
            {Icon} {title}
          </SheetTitle>
        </SheetHeader>
        <div className="flex w-full flex-col gap-4">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
