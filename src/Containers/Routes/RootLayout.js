import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Validation from "../Login/Validation";
import HomePage from "../Home/HomePage";
import MovieData from "..//Details/MovieData";
import ProtectedRoutes from "./ProtectedRoutes";
import PageNotFound from "../../Components/PageNotFound/PageNotFound";

const RootLayout = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Validation />} />
        <Route path="/home" element={<ProtectedRoutes />}>
          <Route path="/home/currentPage.page?" element={<HomePage />} />
          <Route path="/home/details/:id" element={<MovieData />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default RootLayout;
