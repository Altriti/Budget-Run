import { Field, useField } from "formik";
import { useEffect, useState } from "react";
import { Form, Label, SemanticCOLORS } from "semantic-ui-react";

interface Props {
    placeholder: string;
    name: string;
    label?: string;
    type?: string;
    onChange: (value: string) => void;
    formcolor: SemanticCOLORS;
}

export default function MyTypeInput(props: Props) {
    useEffect(() => {
        setFieldColor(props.formcolor);
    }, [props.formcolor]);

    const [field, meta] = useField(props.name);
    const [fieldColor, setFieldColor] = useState<SemanticCOLORS>(props.formcolor);

    function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        field.onChange(event);
        props.onChange(event.target.value);
        if (event.target.value === "Expense") {
            setFieldColor('red');
        } else if (event.target.value === "Income") {
            setFieldColor('blue');
        } else {
            setFieldColor('grey');
        };
    };

    return (
        <Form.Field error={meta.touched && !!meta.error} onChange={handleChange}>
            <label>{props.label}</label>
            <Field
                as="select"
                style={{ color: fieldColor, border: `2px solid ${fieldColor}`, textDecoration: 'underline' }}
                {...field} {...props}
            >
                <option className='formDropdown' value="" style={{ color: 'black', fontSize: '17px' }}>Choose a type</option>
                <option className='formDropdown' color="red" value="Expense" style={{ color: 'red', fontSize: '17px' }}>Expense</option>
                <option className='formDropdown' color="blue" value="Income" style={{ color: 'blue', fontSize: '17px' }}>Income</option>
            </Field>
            {
                meta.touched && meta.error ? (
                    <Label basic color="red">{meta.error}</Label>
                ) : null
            }
        </Form.Field >
    );
}