import React, { useEffect } from "react";

import toast from "react-hot-toast";
import Loader from "../Layouts/Loader";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import MetaData from "../Layouts/Metadata";

import AdminLayout from "../Layouts/AdminLayout";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../../Redux/Api/userApi";

const ListUsers = () => {
  const { data, isLoading, error } = useGetAllUsersQuery();
  const [
    deleteUser,
    { error: deleteError, isSuccess, isLoading: isDeleteLoading },
  ] = useDeleteUserMutation();
  console.log("API Response Data:", data);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }
    if (isSuccess) {
      toast.success("User deleted successfully");
    }
  }, [error, deleteError, isSuccess]);

  const deleteUserHandler = (id) => {
    console.log("deleting user is.....", id);
    deleteUser(id);
  };

  const setUsers = () => {
    const users = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Role",
          field: "role",
          sort: "asc",
        },

        {
          label: "Action",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    data?.users?.forEach((user) => {
      users.rows.push({
        id: user?._id,
        name: user?.name,
        email: user?.email,
        role: user?.role,

        actions: (
          <>
            <div className="d-flex ">
              <Link
                to={`/admin/users/${user?._id}`}
                className="btn btn-outline-primary"
              >
                <i className="fa fa-pencil"></i>
              </Link>

              <button
                className="btn btn-outline-danger ms-2"
                onClick={() => deleteUserHandler(user?._id)}
                disabled={isDeleteLoading}
              >
                <i className="fa fa-trash"></i>
              </button>
            </div>
          </>
        ),
      });
    });
    return users;
  };

  if (isLoading) return <Loader />;

  return (
    <AdminLayout>
      <MetaData title={"All Orders"} />
      <h1 className="my-5">{data?.users?.length} Users</h1>
      <MDBDataTable data={setUsers()} className="px-3" bordered striped hover />
    </AdminLayout>
  );
};

export default ListUsers;
