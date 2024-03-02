import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CheckFat, Trash } from "@phosphor-icons/react";

type ConfirmDeleteProps = {
  isOpenConfirmDelete: boolean;
  setIsOpenConfirmDelete: (value: boolean) => void;
  handleDelete: () => void;
};

export default function ConfirmDelete({
  isOpenConfirmDelete,
  setIsOpenConfirmDelete,
  handleDelete,
}: ConfirmDeleteProps) {
  return (
    <AlertDialog
      open={isOpenConfirmDelete}
      onOpenChange={setIsOpenConfirmDelete}
    >
      <AlertDialogContent className="bg-background-dark border-background">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-foreground flex flex-row items-center gap-2 text-xl">
            <Trash className="h-5 w-5" /> Deseja excluir o registro?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não poderá ser revertida!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-2 flex h-10 flex-row gap-2">
          <AlertDialogCancel className="bg-background hover:bg-green hover:text-background h-10 cursor-crosshair rounded-lg px-4 py-2 font-semibold transition duration-300 ease-in-out">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="m-0 flex h-10 flex-row gap-2 rounded-lg px-4 py-2"
            onClick={handleDelete}
          >
            <CheckFat className="h-5 w-5" />
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
