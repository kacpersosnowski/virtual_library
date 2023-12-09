import { RouteObject } from "react-router-dom";
import AdminPanel from "./AdminPanel";
import AddBookForm from "../../components/Forms/books/AddBookForm";

const routes: RouteObject[] = [
  {
    path: "/admin",
    element: <AdminPanel />,
    children: [{ path: "add-book", element: <AddBookForm /> }],
  },
];

export default routes;
