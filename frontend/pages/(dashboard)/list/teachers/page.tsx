"use client";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data";
import { useEffect, useState } from "react";
import { teachersAPI } from "../../../../api";
import Image from "next/image";
import Link from "next/link";

type Teacher = {
  _id: string;
  name: string;
  email?: string;
  employeeId?: string;
  subject?: string;
  phone?: string;
  address?: string;
};

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  { header: "Email", accessor: "email", className: "hidden md:table-cell" },
  { header: "Subject", accessor: "subject", className: "hidden md:table-cell" },
  {
    header: "Actions",
    accessor: "action",
  },
];

const TeacherListPage = () => {
  const [items, setItems] = useState<Teacher[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await teachersAPI.getAll(1, 100);
        const data = (res?.data || res) as any[];
        if (mounted) setItems(data);
      } catch (e) {
        console.error("Failed to load teachers", e);
      }
    })();
    return () => { mounted = false };
  }, []);

  const renderRow = (item: Teacher) => (
    <tr
      key={item._id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item?.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.email}</td>
      <td className="hidden md:table-cell">{item.subject}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/teachers/${item._id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/view.png" alt="" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
            //   <Image src="/delete.png" alt="" width={16} height={16} />
            // </button>
            <FormModal table="teacher" type="delete" id={item._id}/>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && (
              // <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              //   <Image src="/plus.png" alt="" width={14} height={14} />
              // </button>
              <FormModal table="teacher" type="create"/>
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={items} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default TeacherListPage;
