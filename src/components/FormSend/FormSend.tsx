import React, {useState} from 'react';
import {FormMessage} from '../../type';

interface Props {
  onSubmit: (message: FormMessage) => void;
}
const FormSend : React.FC<Props> = ({onSubmit}) => {
  const [formData, setFormData] = useState<FormMessage>({
    author: 'Author',
    message: ''
  });
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => ({...prevState, [e.target.name]: e.target.value}));
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  return (
    <form className="row justify-content-center" onSubmit={onFormSubmit}>
      <div className="col-5">
        <div className="mb-3">
          <label htmlFor="author" className="form-label">Author</label>
          <input
            type="text"
            name="author"
            className="form-control"
            id="author"
            value={formData.author}
            onChange={changeHandler}
            required/>
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">Message</label>
          <input
            type="text"
            name="message"
            className="form-control"
            id="message"
            value={formData.message}
            onChange={changeHandler}
            required/>
        </div>
        <button type="submit" className="btn btn-primary">Send</button>
      </div>
    </form>
  );
};

export default FormSend;