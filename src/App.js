import "./App.css";

//Importing necessary components amd functions from the react-router-dom library for routing.
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Main from "./Components/Home/Main";
import PropertyList from "./Components/Home/PropertyList";
import PropertyDetails from "./Components/PropertyDetails/PropertyDetails";
import Login from "./Components/User/Login";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "./Store/User/user-action";
import { userActions } from "./Store/User/user-slice";
import Signup from "./Components/User/Signup";
import Profile from "./Components/User/Profile";
import EditProfile from "./Components/User/EditProfile";
import UpdatePassword from "./Components/User/UpdatePassword";
import ForgotPassword from "./Components/User/ForgotPassword";
import ResetPassword from "./Components/User/ResetPassword";
import Payment from "./Components/Payment/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import MyBookings from "./Components/Mybookings/MyBookings";
import BookingDetails from "./Components/Mybookings/BookingDetails";
import AccomodationForm from "./Components/Accomodation/AccomodationForm";
import Accomodation from "./Components/Accomodation/Accomodation";

function App() {
  const stripePromise = loadStripe(
   "pk_test_51P2YZUK8aTJkHCbVhF77M52AfSJLO26yrA33Xv3znchlRSctRhLq2qDWuhmbqJSZsxjZXyXaQQEh6CaUvkQkDbDH00Q0pQUBmX");
  const dispatch = useDispatch();
  const { errors } = useSelector((state) => state.user);
  useEffect(() => {
    if (errors) {
      dispatch(userActions.clearError());
    }
    dispatch(currentUser());
  }, [errors, dispatch]);
  //mananges the routing configuration for the application.
  const router = createBrowserRouter(
    // creates routes from the elements passed to it.
    createRoutesFromElements(
      //defines a Route component that matches all paths "/" and renders the Main component.
      //exact properties ensure that the route matches exactly what u gave in path
      <Route path="/" element={<Main />} id="main" exact>
        <Route id="home" index element={<PropertyList />} exact />
        <Route
          element={<PropertyDetails />}
          id="PropertyDetails"
          path="propertylist/:id"
          exact
        />
        <Route id="login" path="login" element={<Login />}></Route>
        <Route id="signup" path="signup" element={<Signup />}></Route>
        <Route id="profile" path="profile" element={<Profile />}></Route>
        <Route
          id="editprofile"
          path="editprofile"
          element={<EditProfile />}
        ></Route>
        <Route
          id="updatepassword"
          path="user/updatepassword"
          element={<UpdatePassword />}
        ></Route>
        <Route
          id="forgotpassword"
          path="user/forgotpassword"
          element={<ForgotPassword />}
        ></Route>
        <Route
          id="resetpassword"
          path="user/resetPassword/:token"
          element={<ResetPassword />}
        ></Route>
        <Route
          id="payment"
          path="payment/:propertyId"
          element={
            <Elements stripe={stripePromise}>
              <Payment></Payment>
            </Elements>
          }
        ></Route>
        <Route
          id="mybookings"
          path="user/booking"
          element={<MyBookings />}
        ></Route>
        <Route
          id="bookingdetails"
          path="user/booking/:bookingId"
          element={<BookingDetails />}
        />
         {/* accomodation */}
         { <Route
          id="accomodation"
          path="accommodation"
          element={<Accomodation />}
        /> }

        { <Route
          id="accomodationform"
          path="accomodationform"
          element={<AccomodationForm />}
        /> }
      </Route>

    )
  );
  return (
    <div className="App">
      {/* This ensures that the rounting functionallity is available throughout the application */}
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        draggable={true}
        transition={Flip}
      />
    </div>
  );
}

export default App;
