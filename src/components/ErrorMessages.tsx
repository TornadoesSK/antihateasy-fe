import { ContainerStyle } from "../styles/ContainerStyle";
import { PaddingStyle } from "../styles/PaddingStyle";
import { TextStyle } from "../styles/TextStyle";

export const ErrorMessages = ({ errors }: { errors: string[] }) => (
  <div
    css={[
      ContainerStyle({ direction: "column" }),
      PaddingStyle({ t: 2, b: 4 }),
    ]}
  >
    {errors.map((error, idx) => (
      <div key={`${error}${idx}`} css={[ErrorMessageStyle()]}>
        {error}
      </div>
    ))}
  </div>
);

const ErrorMessageStyle = () => [TextStyle({ danger: true, small: true })];
