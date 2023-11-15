import { useFormik } from "formik";
import React from "react";
import Form from "react-bootstrap/Form";
import { editorLinkSchema } from "../../../../utils/form-validation-schema";
import { useSlateStatic } from "slate-react";
import { Transforms } from "slate";

const EditorLink = ({ setShowPopover, handleApplyStyles }) => {
  const editor = useSlateStatic();

  const init = {
    editor_link_text: "",
    editor_link: "",
  };

  const handleSubmit = (values) => {
    if (editor.selection) {
      Transforms.select(editor, editor.selection);
      Transforms.insertNodes(editor, {
        type: "link",
        character: values.editor_link_text,
        url: values.editor_link,
        children: [{ text: "" }],
      });
      Transforms.move(editor);
      handleApplyStyles("link");
      setShowPopover(false);
    }
  };

  const formik = useFormik({
    initialValues: init,
    validationSchema: editorLinkSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <Form.Group className="mb-3">
          <Form.Label>Text *</Form.Label>
          <Form.Control
            type="text"
            placeholder="text"
            value={formik.values.editor_link_text}
            name="editor_link_text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.editor_link_text &&
            formik.errors.editor_link_text && (
              <p className="text-danger mt-1">
                {formik.errors.editor_link_text}
              </p>
            )}
        </Form.Group>
        <Form.Group className="mb-1">
          <Form.Label>Link *</Form.Label>
          <Form.Control
            type="text"
            placeholder="text"
            value={formik.values.editor_link}
            name="editor_link"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.editor_link && formik.errors.editor_link && (
            <p className="text-danger mt-1">{formik.errors.editor_link}</p>
          )}
        </Form.Group>
        <div className="d-flex justify-content-end mt-3">
          <button
            className="btn btn-dark btn-sm"
            onClick={(e) => {
              e.preventDefault();
              handleApplyStyles("link");
              setShowPopover(false);
            }}
          >
            Cancel
          </button>
          <button className="btn btn-primary btn-sm ms-3" type="submit">
            Add
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditorLink;
