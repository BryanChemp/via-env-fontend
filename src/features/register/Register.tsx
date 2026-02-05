import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faEnvelope,
  faLock,
  faShieldAlt,
  faCheckCircle,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';

export function Register() {
  return (
    <RegisterContainer>
      {/* Lado Esquerdo: Visual & Proposta de Valor */}
      <InfoSection>
        <div className="overlay" />
        <div className="content">
          <Brand>
            <LogoIcon>
              <FontAwesomeIcon icon={faShieldAlt} />
            </LogoIcon>
            <span>ViaEnv</span>
          </Brand>

          <BenefitList>
            <h2>Comece a proteger sua infraestrutura em segundos.</h2>
            <BenefitItem>
              <div className="check"><FontAwesomeIcon icon={faCheckCircle} /></div>
              <div>
                <h4>Segurança de Nível Bancário</h4>
                <p>Criptografia ponta-a-ponta em todos os seus ambientes.</p>
              </div>
            </BenefitItem>
            <BenefitItem>
              <div className="check"><FontAwesomeIcon icon={faCheckCircle} /></div>
              <div>
                <h4>Integração Nativa</h4>
                <p>CLI, Docker, Kubernetes e as principais nuvens do mercado.</p>
              </div>
            </BenefitItem>
            <BenefitItem>
              <div className="check"><FontAwesomeIcon icon={faCheckCircle} /></div>
              <div>
                <h4>Até 3 usuários gratuitos</h4>
                <p>Ideal para pequenos times e projetos pessoais.</p>
              </div>
            </BenefitItem>
          </BenefitList>
        </div>
      </InfoSection>

      {/* Lado Direito: Formulário */}
      <FormSection>
        <div className="form-wrapper">
          <header>
            <h1>Criar sua conta</h1>
            <p>Junte-se a mais de 10.000 desenvolvedores.</p>
          </header>

          <SocialGroup>
            <SocialButton><FontAwesomeIcon icon={faGoogle} /> Google</SocialButton>
            <SocialButton><FontAwesomeIcon icon={faGithub} /> GitHub</SocialButton>
          </SocialGroup>

          <Divider><span>ou use seu e-mail corporativo</span></Divider>

          <Form onSubmit={(e) => e.preventDefault()}>
            <Row>
              <InputGroup>
                <label>Nome Completo</label>
                <div className="input-wrapper">
                  <FontAwesomeIcon icon={faUser} className="field-icon" />
                  <input type="text" placeholder="John Doe" />
                </div>
              </InputGroup>
            </Row>

            <InputGroup>
              <label>E-mail de Trabalho</label>
              <div className="input-wrapper">
                <FontAwesomeIcon icon={faEnvelope} className="field-icon" />
                <input type="email" placeholder="john@empresa.com" />
              </div>
            </InputGroup>

            <InputGroup>
              <label>Senha</label>
              <div className="input-wrapper">
                <FontAwesomeIcon icon={faLock} className="field-icon" />
                <input type="password" placeholder="Mínimo 8 caracteres" />
              </div>
              <PasswordStrength>
                <div className="bar active" /><div className="bar active" /><div className="bar" /><div className="bar" />
                <span>Senha média</span>
              </PasswordStrength>
            </InputGroup>

            <TermsText>
              Ao clicar em cadastrar, você concorda com nossos 
              <a href="#"> Termos de Serviço</a> e <a href="#"> Política de Privacidade</a>.
            </TermsText>

            <SubmitButton>
              Criar Conta Gratuita
              <FontAwesomeIcon icon={faArrowRight} />
            </SubmitButton>
          </Form>

          <Footer>
            Já possui uma conta? <a href="#">Fazer login</a>
          </Footer>
        </div>
      </FormSection>
    </RegisterContainer>
  );
}

// --- STYLED COMPONENTS ---

const RegisterContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: white;
  font-family: 'Inter', sans-serif;
`;

const InfoSection = styled.section`
  flex: 1;
  background: #0F172A;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 60px;
  color: white;

  @media (max-width: 1000px) { display: none; }

  .overlay {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at top left, ${({ theme }) => theme.colors.primary}33 0%, transparent 70%);
  }

  .content { position: relative; z-index: 1; }
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 80px;
`;

const LogoIcon = styled.div`
  width: 40px; height: 40px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
`;

const BenefitList = styled.div`
  h2 { font-size: 36px; line-height: 1.2; margin-bottom: 48px; max-width: 450px; }
`;

const BenefitItem = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 32px;

  .check {
    color: ${({ theme }) => theme.colors.success};
    font-size: 20px;
    margin-top: 4px;
  }

  h4 { margin: 0 0 4px 0; font-size: 18px; }
  p { margin: 0; color: #94A3B8; line-height: 1.5; }
`;

const FormSection = styled.section`
  flex: 1.2;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;

  .form-wrapper { width: 100%; max-width: 480px; }
  
  header {
    margin-bottom: 32px;
    h1 { font-size: 32px; color: ${({ theme }) => theme.colors.text}; margin-bottom: 8px; }
    p { color: ${({ theme }) => theme.colors.textSecondary}; }
  }
`;

const SocialGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
`;

const SocialButton = styled.button`
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: white;
  display: flex; align-items: center; justify-content: center; gap: 10px;
  font-weight: 600; cursor: pointer;
  &:hover { background: #f8fafc; }
`;

const Divider = styled.div`
  display: flex; align-items: center; margin-bottom: 24px;
  &::before, &::after { content: ""; flex: 1; border-bottom: 1px solid #e2e8f0; }
  span { padding: 0 12px; font-size: 13px; color: #94a3b8; }
`;

const Form = styled.form`
  display: flex; flex-direction: column; gap: 20px;
`;

const Row = styled.div`
  display: grid; grid-template-columns: 1fr; gap: 20px;
`;

const InputGroup = styled.div`
  display: flex; flex-direction: column; gap: 8px;
  label { font-size: 14px; font-weight: 600; color: ${({ theme }) => theme.colors.text}; }
  
  .input-wrapper {
    position: relative;
    .field-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #94a3b8; }
    input {
      width: 100%; padding: 12px 14px 12px 42px; border-radius: 8px;
      border: 1px solid ${({ theme }) => theme.colors.border};
      font-size: 15px; outline: none;
      &:focus { border-color: ${({ theme }) => theme.colors.primary}; box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}15; }
    }
  }
`;

const PasswordStrength = styled.div`
  display: flex; align-items: center; gap: 6px; margin-top: 4px;
  .bar { flex: 1; height: 4px; background: #e2e8f0; border-radius: 2px; }
  .bar.active { background: #F59E0B; }
  span { font-size: 12px; color: #64748b; margin-left: 4px; }
`;

const TermsText = styled.p`
  font-size: 13px; color: #64748b; line-height: 1.5;
  a { color: ${({ theme }) => theme.colors.primary}; text-decoration: none; font-weight: 600; }
`;

const SubmitButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white; border: none; padding: 14px; border-radius: 8px;
  font-size: 16px; font-weight: 700; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 10px;
  &:hover { opacity: 0.95; }
`;

const Footer = styled.div`
  margin-top: 32px; text-align: center; font-size: 15px;
  color: ${({ theme }) => theme.colors.textSecondary};
  a { color: ${({ theme }) => theme.colors.primary}; font-weight: 700; text-decoration: none; }
`;