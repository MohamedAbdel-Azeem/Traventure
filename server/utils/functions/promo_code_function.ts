import { useEffect, useState } from "react";
import { useGetAllUsers } from "../../../client/src/custom_hooks/tourist_fetchandelete";
import {
  getPromoCode,
  useAddPromoCode,
  usePromoCodeagain,
} from "../../../client/src/custom_hooks/promo_codes/promocodecustomhooks";
import emailjs from "emailjs-com";
const promocodefunction = () => {
  const { data } = useGetAllUsers();

  const [datastate, setDataState] = useState(data);

  useEffect(() => {
    setDataState(data);
  }, [data]);

  const generateRandomCode = (): string => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    let code = "";

    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      code += letters[randomIndex];
    }

    for (let i = 0; i < 2; i++) {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      code += numbers[randomIndex];
    }

    return code;
  };

  function useSendPromoCode(username: string, email: string, code: string) {
    usePromoCodeagain(username);
    emailjs.send(
      "service_iks4kpr",
      "template_bp19uik",
      {
        from_name: username,
        to_email: email,
        promo_code: code,
      },
      "fnz4MxuCOvZvFRU4x"
    );
  }
useEffect(() => {
  datastate?.tourists.map(async (tourist) => {
    if (tourist.dateOfBirth) {
      const date = new Date(tourist.dateOfBirth);
      const currentDate = new Date();
      if (date.getMonth() === currentDate.getMonth()) {
        if (date.getDate() === currentDate.getDate()) {
          if (!(await getPromoCode(tourist.username))) {
            const code = generateRandomCode();
            try {
              await useAddPromoCode(code);
              await useSendPromoCode(tourist.username, tourist.email, code);
              console.log("Promo code sent to " + tourist.username);
            } catch (error) {
              console.log(error);
            }
          }
        }
      }
    }
  });
}, [datastate]);
};

export default promocodefunction;
