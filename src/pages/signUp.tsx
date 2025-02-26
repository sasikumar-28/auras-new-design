import BaseLayout from "@/components/auth/baseLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate, useSearchParams } from "react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useCustomerAuth } from "@/hooks/useCustomerAuth";
import { toast } from "sonner";

const SignUp = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signUp } = useCustomerAuth();
  const redirect = searchParams.get("redirect");

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    rememberMe: false,
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email ID is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    rememberMe: Yup.boolean(),
  });

  const handleSubmit = (
    values: typeof initialValues & { rememberMe?: boolean }
  ) => {
    const { rememberMe, ...rest } = values; // Create a new object without rememberMe
    console.log(rememberMe);
    signUp(rest).then((res) => {
      if (!res?.failed) {
        navigate(`/login?${redirect ? redirect : ""}`);
        toast.success("Sign up successful");
      } else {
        toast.error(res.error.message);
      }
    });
  };

  return (
    <BaseLayout>
      <div className="flex flex-col w-full gap-5 justify-center h-full items-center p-2 bg-[#B93284] text-white">
        <div className="flex justify-center gap-12 w-full">
          <img
            src="/images/auras_logo_white_large.png"
            className="w-[111px] h-[100px]"
          />
          <img
            src="/images/aspire_systems_logo_white.png"
            className="w-[166px] h-[105px]"
          />
        </div>

        {/* Formik form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="flex flex-col w-5/6 gap-6">
              <div>
                <label>First Name *</label>
                <Field
                  name="firstName"
                  as={Input}
                  className="w-full bg-white text-black rounded-[8px] border-0 opacity-30 h-[56px]"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label>Last Name *</label>
                <Field
                  name="lastName"
                  as={Input}
                  className="w-full bg-white text-black rounded-[8px] border-0 opacity-30 h-[56px]"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label>Email ID *</label>
                <Field
                  name="email"
                  type="email"
                  as={Input}
                  className="w-full bg-white text-black rounded-[8px] border-0 opacity-30 h-[56px]"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label>Password *</label>
                <Field
                  name="password"
                  type="password"
                  as={Input}
                  className="w-full bg-white text-black rounded-[8px] border-0 opacity-30 h-[56px]"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex items-center gap-2 -mt-4">
                <Field
                  type="checkbox"
                  name="rememberMe"
                  as={Checkbox}
                  className="bg-white rounded-[2px] border-0"
                />
                <label>Remember me</label>
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full font-bold hover:bg-gray-50 bg-white rounded-[8px] shadow-md text-[#B93284] h-[56px]"
                >
                  REGISTER
                  <Icon icon="mdi:arrow-right" width="24" height="24" />
                </Button>
              </div>

              <div className="font-normal text-center mt-2">
                Already having account ?{" "}
                <span
                  className="underline cursor-pointer"
                  onClick={() => {
                    navigate(`/login?${redirect ? redirect : ""}`);
                  }}
                >
                  Login
                </span>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </BaseLayout>
  );
};

export default SignUp;
