import BaseLayout from "@/components/auth/baseLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCustomerAuth } from "@/hooks/useCustomerAuth";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { login } from "@/store/reducers/authReducer";
import { useEffect, useState } from "react";
import { decryptData, encryptData } from "@/utils/helper";
import { useCart } from "@/hooks/useCart";

interface LoginFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { createCart } = useCart();
  const dispatch = useDispatch();
  const { signIn } = useCustomerAuth();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  useEffect(() => {
    const savedCredentials = localStorage.getItem("user_keys");
    if (savedCredentials) {
      const decrypted = JSON.parse(decryptData(savedCredentials));
      formik.setValues({
        email: decrypted.email,
        password: decrypted.password,
      });
      setRememberMe(true);
    }
  }, []);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik<LoginFormValues>({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await signIn(values);
        if (!res?.failed) {
          if (rememberMe) {
            localStorage.setItem(
              "user_keys",
              encryptData(JSON.stringify(values)),
            );
          } else {
            localStorage.removeItem("user_keys");
          }
          const res = await createCart();
          dispatch(login({ ...res, cartId: res.id }));
          localStorage.setItem(
            "user",
            encryptData(JSON.stringify({ ...res, cartId: res.id })),
          );
          toast.success("Log in successful");
          navigate(redirect || "/");
        } else {
          toast.error(res.error.message);
        }
      } catch (err) {
        console.log(err);
        toast.error("An unexpected error occurred");
      }
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
            alt="Aura Logo"
            className="w-[96px] h-[97px]"
          />
          <img
            src="/images/aspire_logo_coloured.png"
            alt="Aspire Logo"
            className="w-[174px] h-[108px]"
          />
        </div>

        <div className="flex flex-col w-5/6 gap-8">
          <div>
            <label htmlFor="email">Email ID *</label>
            <Input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="w-full bg-white text-black rounded-[8px] border-[1px] border-[#DEDEDE] h-[56px]"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}
          </div>

          <div>
            <label htmlFor="password">Password *</label>
            <Input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="w-full bg-white text-black rounded-[8px] border-[1px] border-[#DEDEDE] h-[56px]"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm">
                {formik.errors.password}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="rememberMe"
              checked={rememberMe}
              onCheckedChange={() => setRememberMe(!rememberMe)}
              className="bg-white rounded-[2px] border-[1px]"
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>

          <Button
            type="submit"
            className="w-full font-bold bg-[#B93284] rounded-[8px] shadow-md text-white h-[56px] hover:bg-[#a02971]"
          >
            LOGIN
            <Icon icon="mdi:arrow-right" width="24" height="24" />
          </Button>
          <div className="font-normal text-center mt-2">
            New to Auras?&nbsp;
            <span
              className="underline cursor-pointer text-[#B93284]"
              onClick={() => navigate(`/signup?${redirect}`)}
            >
              Create an account
            </span>
          </div>
        </div>
      </form>
    </BaseLayout>
  );
};

export default Login;
