
import React, { useState } from 'react'
import { Textarea, Container } from './styles'
import { useForm } from "react-hook-form";
import TextInput from '../../TextInput';
import Paragraphs from '../../Paragraphs/Paragraphs';
import { sendM } from '../../../infraestructure/api/API'
import { useHistory } from 'react-router';
const Form = ({ toggleKeyboard }) => {
  
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const [show, setshow] = useState(false);
  const onSubmit = async (data) => {
    await sendM(data.name, data.email, data.phone);
    setshow(true);
    setTimeout(() => {
      history.goBack();
    }, 2000);
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)} className="tw-h-full">
      <Paragraphs family="univers" className="tw-text-white" size="3xl">
        Si necesitas más información déjanos tus datos y nos pondremos en
        contacto contigo:
      </Paragraphs>
      <div className="tw-w-full tw-mt-7">
        <Paragraphs
          size="lg"
          className="tw-mb-3 tw-block tw-italic tw-text-white"
        >
          Deje su mensaje
        </Paragraphs>
        <Textarea
          placeholder="Hola, buenos días"
          ref={register}
          autoFocus={true}
          class="mod-textarea motionIn"
          name="name"
        ></Textarea>
      </div>
      <div className="tw-flex">
        <div className="tw-w-6/12">
          <TextInput
            label={"Numero de telefono"}
            register={register}
            name={"phone"}
            placeholder="655 55 55 55"
            onBlur={()=>toggleKeyboard(false)}
            onFocus={()=> toggleKeyboard(true)}
          />
        </div>
        <div className="tw-w-6/12">
          <TextInput
            error={errors.email && errors.email.message}
            label={"Email de contacto"}
            register={register({
              required: {
                value: true,
                message: "Necesitamos al menos tu email",
              },
            })}
            name={"email"}
            placeholder="@"
            type="email"
          />
        </div>
      </div>
      <button
        type="submit"
        className="tw-bg-primary tw-fixed tw-right-20 tw-bottom-20 tw-px-8 tw-py-2 tw-rounded-full"
        style={{
          outline: "none",
        }}
      >
        <Paragraphs size="xl" family="universe">
          Enviar
        </Paragraphs>
      </button>
      {show && (
        <div className="tw-fixed tw-bg-black-600 tw-h-16 tw-w-80 tw-right-10 tw-bottom-10 tw-rounded-sm tw-p-2 tw-flex tw-items-center tw-justify-center">
          <Paragraphs className="tw-italic tw-text-white">
            Mesaje enviado correctamente
          </Paragraphs>
        </div>
      )}
    </Container>
  );
};



export default Form
