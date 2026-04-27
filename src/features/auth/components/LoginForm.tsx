import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/useLogin";

type FormValues = {
    email: string;
    password: string;
};

export const LoginForm = () => {
    const { register, handleSubmit } = useForm<FormValues>();
    const loginMutation = useLogin();

    const onSubmit = (data: FormValues) => {
        loginMutation.mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("email")} placeholder="Email" />
            <input
                {...register("password")}
                type="password"
                placeholder="Password"
            />
            <button type="submit" disabled={loginMutation.isPending}>
                Login
            </button>
        </form>
    );
};