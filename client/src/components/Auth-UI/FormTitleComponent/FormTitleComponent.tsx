import { ChildrenProps } from '@Types/index';
import { StyledFormTitle, StyledFormTitleContainer } from './FormTitleComponent.styled';

const FormTitleComponent = ({ children }: ChildrenProps) => {
	return (
		<StyledFormTitleContainer>
			<StyledFormTitle>{children}</StyledFormTitle>
		</StyledFormTitleContainer>
	);
};

export default FormTitleComponent;
