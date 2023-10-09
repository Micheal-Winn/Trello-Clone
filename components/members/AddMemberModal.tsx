"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useBoardStore } from "@/globalState/store/zustand.store";
import DropdownUser from "../utils/DropdownUser";
import { UseMutateFunction } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Toaster, toast } from "sonner";

const AddMemberModal: React.FC<Props> = ({
  children,
  users,
  loading,
  mutate,
  boardId,
  beenAdded
}) => {
  const { setMemberName,setMember } = useBoardStore();
  const addMemberHandler = (userId:string)=>{
    mutate({boardId,userId})
  }
  return (
    <>
    <Toaster richColors position="top-center" />
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="dark:bg-gray-700">
        <DialogHeader>Add Member</DialogHeader>
        <section className="flex items-center">
          <Input
            placeholder="Enter member name"
            onChange={(e) => setMemberName(e.target.value)}
          />
          {/* // <Button>Search</Button> */}
        </section>
        <section className="flex flex-col">
          {users?.map((usr) => (
            <Button variant={'ghost'} className="flex items-center justify-start gap-2" key={usr?.id}
              onClick={()=>{
                if(beenAdded){
                  toast.error("Member has already been added")
                }else{
                setMember(usr)
                addMemberHandler(usr?.id!)
                }
              }}
            >
              <Avatar className="w-6 h-6">
                <AvatarImage src={usr?.image!} alt={usr?.name!} />
                <AvatarFallback>{usr?.name}</AvatarFallback>
              </Avatar>
              <span className="text-xs font-medium">{usr?.name}</span>
            </Button>
          ))}
        </section>
      </DialogContent>
    </Dialog>
    </>
  );
};

export default AddMemberModal;

interface Props {
  children: React.ReactNode;
  users: Array<UserProps>;
  loading: boolean;
  mutate: UseMutateFunction<
    any,
    unknown,
    AddMember,
    {
      previousMembers: unknown;
    }
  >;
  boardId:string,
  beenAdded:boolean
}
