import Card from "../common/Card";

interface IProperties {
  text: string;
  data: any;
  isLoading: boolean;
}

interface ICardContainerProps {
  properties: IProperties[];
}

export default function CardContainer({ properties }: ICardContainerProps) {
  return (
    <>
      {properties.map((property: IProperties, indx: number) => (
        <Card
          key={indx}
          text={property.text}
          data={property.data}
          isLoading={property.isLoading}
        />
      ))}
    </>
  );
}
