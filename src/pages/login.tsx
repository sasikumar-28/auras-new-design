import BaseLayout from "@/components/auth/baseLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate, useSearchParams } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCustomerAuth } from "@/hooks/useCustomerAuth";

const Login = () => {
  const navigate = useNavigate();
  const { signIn, loginLoading } = useCustomerAuth();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form values:", values);
      signIn(values);
    },
  });

  return (
    <BaseLayout>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col w-full gap-5 justify-center h-full items-center p-2 bg-white"
      >
        <div className="flex justify-center gap-12 w-full">
          <img
            src="/images/aura_logo_gradient_large.png"
            className="w-[96px] h-[97px]"
          />
          <img
            src="/images/aspire_logo_coloured.png"
            className="w-[174px] h-[108px]"
          />
        </div>

        <div className="flex flex-col w-5/6 gap-8">
          <div>
            <div>Email ID *</div>
            <Input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="w-full bg-#FFFFFF text-black rounded-[8px] border-[1px] border-[#DEDEDE] shadow-lg h-[56px]"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}
          </div>

          <div>
            <div>Password *</div>
            <Input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="w-full bg-#FFFFFF text-black rounded-[8px] border-[1px] border-[#DEDEDE] shadow-lg h-[56px]"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm">
                {formik.errors.password}
              </div>
            )}
          </div>

          <div>
            <Checkbox
              id="rememberMe"
              name="rememberMe"
              className="bg-white rounded-[2px] border-[1px]"
            />{" "}
            Remember me
          </div>

          <div>
            <Button
              type="submit"
              className="w-full font-bold hover:bg-gray-50 bg-[#B93284] rounded-[8px] shadow-md text-white h-[56px]"
            >
              LOGIN
              <Icon icon="mdi:arrow-right" width="24" height="24" />
            </Button>
            <div className="font-normal text-center mt-2">
              New to Auras ?
              <span
                className="underline cursor-pointer text-[#B93284]"
                onClick={() => navigate(`/signup?${redirect ? redirect : ""}`)}
              >
                Create an account
              </span>
            </div>
          </div>
        </div>
      </form>
    </BaseLayout>
  );
};

export default Login;
