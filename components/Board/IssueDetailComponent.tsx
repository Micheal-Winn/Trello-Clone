"use client";
import React, { memo, useCallback, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

//icon
import { AlertCircle, CheckSquare, Bookmark } from "lucide-react";
import {
  DoubleArrowDownIcon,
  DoubleArrowUpIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  Cross1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

//components
import StatusDropdown from "../Issue/StatusDropdown";
import Member from "../utils/Member";

//data
import { imgArr, issueType, piorityArr } from "../DummyData/data";
import AddMemberButton from "../Issue/AddMemberButton";
import SearchMember from "../utils/SearchMember";
import PiorityDrowdown from "../Issue/PiorityDropdown";
import Dropdown from "../Issue/Dropdown";
import { useIssueTypeAndPriorityFun } from "../DndComponents/TodoCard";
import { useSession } from "next-auth/react";
import CreateComment from "../comment/CreateComment";
import Comments from "../comment/Comments";
import { useGetLists } from "@/lib/hooks/list.hooks";
import { useParams } from "next/navigation";
import { useGetUsersQuery } from "@/redux/apis/endpoints/users.endpoint";
import { formatDate } from "../utils/util";
import { useAppSelector } from "@/redux/store/hook";

const IssueDetailComponent = ({
  children,
  issue,
  listId,
  indx
}: {
  children: React.ReactNode;
  issue: DndIssueProps;
  listId: string;
  indx:number
}) => {
  const { data: session } = useSession();
  const param = useParams();

  const { data: lists } = useGetLists(param.boardId as string);
  const { data: users, isLoading, isError, error } = useGetUsersQuery();
  const [openSearchInput, setOpenSearchInput] = useState<Boolean>(false);
  const [assignedMembers, setAssignedMembers] = useState(useMemo(() => issue?.assignees, [issue]));
  const [liStatus, setLiStatus] = useState<string>(
    filterStatusType(listId, lists!)
  );
  const [nListId, setNListId] = useState("");
  const changedListId = useAppSelector((state) => state.board.changedListId);
  const newListLength = lists?.find;

  const openSearchInputHandler = () => setOpenSearchInput((prev) => !prev);
  const issueCategory = useIssueTypeAndPriorityFun(piorityArr, issueType, issue);
  const status = filterStatusType(listId, lists!);
  const reporter = useMemo(
    () => users?.find((usr) => usr?.id === issue?.reporterId),
    [issue?.reporterId, users]
  );
  const assignees = useMemo(() => issue?.assignees, [issue]);

  return (
    <Dialog>
      <DialogTrigger className="w-full" asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-[1050px] focus-visible:border-none">
        <DialogHeader>
          <DialogTitle className="text-center">Issue Detail</DialogTitle>
        </DialogHeader>
        <section>
          <section>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <issueCategory.Icon
                  className={`w-5 h-5 p-1 rounded-sm text-white ${issueCategory?.issueCat?.color}`}
                />
                <span>{issueCategory.issueCat?.text}</span>
              </div>
              <Button
                variant={"ghost"}
                className="flex items-center gap-2 group bg-red-500 hover:bg-red-600 !py-1"
              >
                <TrashIcon className="w-4 h-4 text-white" />
                <span className="text-[0.72rem] uppercase font-semibold  text-white">
                  delete
                </span>
              </Button>
            </div>
            <section className="flex gap-4">
              <section className="w-[65%]">
                <h2 className="text-lg font-semibold mt-4">{issue?.summary}</h2>

                {/* desc */}
                <div className="flex flex-col gap-2 mt-6">
                  <Label htmlFor="desc" className="text-base">
                    Description
                  </Label>
                  <p
                    id="desc"
                    className="text-sm font-medium font-rubik tracking-wide leading-6"
                  >
                    {issue?.desc}
                  </p>
                </div>

                <section className="flex flex-col gap-6">
                  <section>
                    <h2 className="text-xs font-medium mt-9 mb-4">Comments</h2>
                    <CreateComment session={session!} issueId={issue?.id} />
                  </section>
                  <Comments issueId={issue?.id} />
                </section>
              </section>
              <section className="w-[35%] flex flex-col gap-6">
                <div>
                  <Label className="uppercase text-xs">status</Label>
                  <StatusDropdown
                    lists={lists!}
                    status={status}
                    issue={issue}
                    oIndx={indx}
                    setNListId={setNListId}
                    liStatus={liStatus}
                    setLiStatus={setLiStatus}
                    newListId={changedListId}
                  />
                </div>
                <div className="w-[140px]">
                  <Label className="uppercase text-xs">reporter</Label>
                  <Member img={reporter?.image!} name={reporter?.name!} />
                  {/* <Dropdown val="" dispatch={()=>void}/> */}
                </div>
                <div className="relative">
                  <Label className="uppercase text-xs">assignees</Label>
                  <div className="flex items-center flex-wrap gap-2">
                    {/* <Member img={imgArr[0].img} name="Kyle Tomi" /> */}
                    {assignedMembers?.map((usr) => (
                      <Member
                        key={usr?.id}
                        img={usr?.User?.image!}
                        name={usr?.User?.name!}
                      />
                    ))}
                    <AddMemberButton handler={openSearchInputHandler} />
                    {openSearchInput && (
                      <SearchMember
                        closeSearchHandler={openSearchInputHandler}
                        users={users!}
                      />
                    )}
                  </div>
                </div>
                <div className="w-[200px]">
                  <Label className="uppercase text-xs">priority</Label>
                  {/* <PiorityDrowdown/> */}
                </div>
                <p className="text-xs font-rubik text-slate-400">
                  Created - <span>{formatDate(issue?.createdAt!)}</span>
                </p>
                <p className="text-xs font-rubik text-slate-400">
                  Updated - {formatDate(issue?.updatedAt!)}
                </p>
              </section>
            </section>
          </section>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default memo(IssueDetailComponent);

const filterStatusType = (type: string, lists: Array<ListProps>) => {
  const status = lists.find((li) => li.id === type);
  return status?.name!;
};