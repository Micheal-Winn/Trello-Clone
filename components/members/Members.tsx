"use client";
import { useGetMembers, useRemoveMember } from "@/lib/hooks/member.hooks";
import React, { useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Users, ExternalLink, UserX } from "lucide-react";
import MemberInfoBtn from "./MemberInfoBtn";
import { Separator } from "../ui/separator";
import { useSession } from "next-auth/react";

const Members = ({ boardId }: Props) => {
  const { data: session } = useSession();
  const user = session?.user;
  const { data: members, isLoading } = useGetMembers(boardId);
  const {mutate:removeMember} = useRemoveMember(boardId,user?.id!);
  
  const admin = useMemo(
    () => members?.find((mem) => mem?.isAdmin === true),
    [members]
  );
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex items-center gap-2 py-1!   bg-blue-600 hover:bg-blue-500 text-white hover:text-white h-8 sm:h-9"
          // onClick={handler}
        >
          <span className="text-[0.7rem] font-rubik xl:text-sm">Members</span>
          <Users className="w-3 h-3 xl:w-4 xl:h-4 text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent className="dark:bg-gray-700">
        <DialogHeader>Members</DialogHeader>
        <section>
          {isLoading ? (
            <h1>Loading...</h1>
          ) : (
            <section>
              <MemberInfoBtn
                imgUrl={admin?.User?.image!}
                name={admin?.User?.name!}
                isAdmin={admin?.isAdmin!}
                userId={admin?.User?.id!}
                adminId={admin?.User?.id!}
                mutate={removeMember}
              />
              <Separator className="my-2" />
              <section className="flex flex-col gap-3">
                {members?.map(
                  (usr) =>
                    usr?.isAdmin === false && (
                      <MemberInfoBtn
                        key={usr?.id}
                        imgUrl={usr?.User?.image!}
                        name={usr?.User?.name!}
                        isAdmin={usr?.isAdmin!}
                        userId={usr?.User?.id!}
                        adminId={admin?.User?.id!}
                        bId={boardId}
                        mId={usr?.id!}
                        mutate={removeMember}
                      />
                    )
                )}
              </section>
            </section>
          )}
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default Members;
type Props = {
  boardId: string;
};
