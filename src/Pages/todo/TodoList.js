import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { deleteTodo } from "./TodoSlice";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../../firebase";
import { logOutUser } from "../Login/userSlice";
import Swal from "sweetalert2";

const TodoList = (props) => {
  const { todos } = props;
  const auth = getAuth(app);
  const todo = useSelector((state) => [...state.todo.todos]);
  const loginUser = useSelector((state) => state.user.loginUser);
  const currentTodo =
    loginUser.length > 0 &&
    todo.filter((todo, idx) => todo.userId === loginUser[0].id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddList = () => {
    navigate("/addtodo", { replace: true });
  };
  const handleEditTodo = (event, id) => {
    navigate(`/edittodo/${id}`, { replace: true });
  };

  const handleDelete = (event, id) => {
    Swal.fire({
      title: "Are you sure you want to delete this?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      dispatch(deleteTodo(id));
    });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(logOutUser());
        navigate("/");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

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
      disableSelectionOnClick: true,
      disableColumnMenu: true,
      width: 200,
      renderCell: (cellValues) => {
        return (
          <>
            <EditIcon
              sx={{ color: "blue", fontSize: 20, cursor: "pointer" }}
              onClick={(event) => {
                handleEditTodo(event, cellValues.id);
              }}
            />
            <DeleteIcon
              sx={{ color: "red", fontSize: 20, cursor: "pointer", ml: 2 }}
              onClick={(event) => {
                handleDelete(event, cellValues.id);
              }}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <Box
        sx={{
          my: 2,
          mt: 5,
          mx: 4,
          display: "flex",
        }}
      >
        <Button variant="contained" color={"secondary"} onClick={handleAddList}>
          <AddIcon
            sx={{
              mr: 1,
              color: "white",
              fontSize: 22,
            }}
          />
          Add TODO
        </Button>

        <Button
          variant="contained"
          sx={{ backgroundColor: "red", ml: "89%", borderRadius: 4 }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
      <Box
        sx={{
          my: 2,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={currentTodo}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </Box>
    </>
  );
};

export default TodoList;
