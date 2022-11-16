import React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { editTodo } from "./TodoSlice";

const TodoList = () => {
  const todo = useSelector((state) => [...state.todos]);
  const dispatch = useDispatch();
  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "description", headerName: "Desctiption", width: 200 },
    {
      field: "imageUrl",
      headerName: "Image",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      // disableClickEventBubbling: true,
      disableSelectionOnClick: true,
      disableColumnMenu: true,
      width: 200,
      renderCell: (cellValues) => {
        return (
          <>
            <EditIcon
              sx={{ color: "blue", fontSize: 20, cursor: "pointer" }}
              onClick={(event) => {
                dispatch(editTodo(cellValues.id));
              }}
            />
            <DeleteIcon
              sx={{ color: "red", fontSize: 20, cursor: "pointer", ml: 2 }}
              // onClick={(event) => {
              //   handleDelete(event, cellValues.row.user_id);
              // }}
            />
          </>
        );
      },
    },
  ];

  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={todo}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </Box>
  );
};

export default TodoList;
