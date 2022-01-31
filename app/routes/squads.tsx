import { ActionFunction, Form, redirect, useActionData, useTransition } from "remix";
import invariant from "tiny-invariant";
import { createSquad } from "~/core/squads";

export default function Squads() {
  const errors = useActionData<PostError>();
  const transition = useTransition();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Squads</h1>

      <Form method="post">
        <p>
          <label>
            Squad name:{" "}
            {errors?.name ? (
              <em>Name is required</em>
            ) : null}
            <input type="text" name="name" />
          </label>
        </p>

        <p>
          <button type="submit">
            {transition.submission
              ? "Creating..."
              : "Create Squad"}
          </button>
        </p>
      </Form>
    </div>
  );
}

type PostError = {
  name?: boolean;
};

export const action: ActionFunction = async ({
  request
}) => {
  await new Promise(res => setTimeout(res, 1000));
  const formData = await request.formData();

  const name = formData.get("name");

  const errors: PostError = {};
  if (!name) errors.name = true;

  if (Object.keys(errors).length) {
    return errors;
  }

  invariant(typeof name === "string");

  await createSquad({ name });

  return redirect("/squads");
};