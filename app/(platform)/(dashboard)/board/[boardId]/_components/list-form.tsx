"use client";

import { toast } from "sonner";
import { Plus, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

import { FormSubmit } from "@/components/form/form-submit";
import { FormInput } from "@/components/form/form-input";
import { createList } from "@/actions/create-list";
import { useAction } from "@/hooks/use-action";
import { Button } from "@/components/ui/button";
import { ListWrapper } from "./list-wrapper";

export const ListForm = () => {
  const router = useRouter();
  const params = useParams();

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [isEditing, setEditing] = useState(false);

  const enableEditing = () => {
    setEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disabledEditing = () => {
    setEditing(false);
  };

  const { execute, fieldErrors } = useAction(createList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" created`);
      disabledEditing();
      router.refresh();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disabledEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disabledEditing);

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;

    execute({
      title,
      boardId,
    });
  };

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          autoComplete="off"
          action={onSubmit}
          ref={formRef}
          className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
        >
          <FormInput
            ref={inputRef}
            id="title"
            errors={fieldErrors}
            placeholder="Enter list title..."
            className="text-sm px-2 py-2 h-7 font-medium border-transparent hover:border-input focud:border-input transition"
          />
          <input hidden value={params.boardId} name="boardId" />
          <div className="flex items-center gap-x-1">
            <FormSubmit>Add list</FormSubmit>
            <Button size="sm" variant="ghost" onClick={disabledEditing}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add a list
      </button>
    </ListWrapper>
  );
};
