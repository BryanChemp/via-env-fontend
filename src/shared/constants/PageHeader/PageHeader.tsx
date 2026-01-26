import type { FC } from "react";
import * as S from "./PageHeaderStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, type IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface PageHeaderButtonProps {
  text: string;
  onClick: () => void;
  icon?: IconDefinition;
}

interface PageHeaderProps {
  title: string
  description: string
  icon: IconDefinition
  button?: PageHeaderButtonProps
}

export const PageHeader: FC<PageHeaderProps> = ({
  title,
  description,
  icon,
  button
}) => {
    return (
        <S.PageHeader>
                <S.HeaderLeft>
                  <S.Title>
                    <FontAwesomeIcon icon={icon} size="sm"/>
                    {title}
                  </S.Title>
                  <S.Subtitle>
                    {description}
                  </S.Subtitle>
                </S.HeaderLeft>
                {button && (
                  <S.HeaderRight>
                    <S.PrimaryButton onClick={button.onClick}>
                      {button.icon && (
                        <FontAwesomeIcon icon={faPlus} />
                      )}
                      {button.text}
                    </S.PrimaryButton>
                  </S.HeaderRight>
                )}     
        </S.PageHeader>
    )
};

