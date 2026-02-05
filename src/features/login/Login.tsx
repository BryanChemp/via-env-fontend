// pages/LoginPage.tsx
import { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faShieldAlt,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';

export function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <LoginContainer>
      {/* Lado Esquerdo: Formulário */}
      <FormSection>
        <div className="content-wrapper">
          <Brand>
            <LogoIcon>
              <FontAwesomeIcon icon={faShieldAlt} />
            </LogoIcon>
            <span>ViaEnv</span>
          </Brand>

          <Header>
            <h1>Bem-vindo de volta</h1>
            <p>Acesse sua conta para gerenciar suas configurações.</p>
          </Header>

          <SocialButtons>
            <SocialButton>
              <FontAwesomeIcon icon={faGoogle} />
              Google
            </SocialButton>
            <SocialButton>
              <FontAwesomeIcon icon={faGithub} />
              GitHub
            </SocialButton>
          </SocialButtons>

          <Divider>
            <span>ou continue com e-mail</span>
          </Divider>

          <Form onSubmit={(e) => e.preventDefault()}>
            <InputGroup>
              <label>E-mail</label>
              <div className="input-wrapper">
                <FontAwesomeIcon icon={faEnvelope} className="field-icon" />
                <input type="email" placeholder="seu@email.com" />
              </div>
            </InputGroup>

            <InputGroup>
              <div className="label-row">
                <label>Senha</label>
                <a href="#">Esqueceu a senha?</a>
              </div>
              <div className="input-wrapper">
                <FontAwesomeIcon icon={faLock} className="field-icon" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                />
                <button 
                  type="button" 
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </InputGroup>

            <SubmitButton type="submit">
              Entrar na conta
              <FontAwesomeIcon icon={faArrowRight} />
            </SubmitButton>
          </Form>

          <Footer>
            Não tem uma conta? <a href="#">Criar conta gratuita</a>
          </Footer>
        </div>
      </FormSection>

      {/* Lado Direito: Visual/Marketing */}
      <VisualSection>
        <div className="overlay" />
        <div className="content">
          <QuoteCard>
            <div className="stars">★★★★★</div>
            <p>
              "A melhor ferramenta para gerenciar variáveis de ambiente que já utilizamos. 
              Segurança e agilidade no deploy do nosso time."
            </p>
            <div className="author">
              <strong>Henrique Lima</strong>
              <span>CTO na TechFlow</span>
            </div>
          </QuoteCard>
        </div>
      </VisualSection>
    </LoginContainer>
  );
}

// --- STYLED COMPONENTS ---

const LoginContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.white};
  font-family: 'Inter', sans-serif;
`;

const FormSection = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xxl}px;

  .content-wrapper {
    width: 100%;
    max-width: 400px;
  }
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 40px;
  font-size: 24px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const Header = styled.div`
  margin-bottom: 32px;
  h1 { font-size: 32px; margin-bottom: 8px; color: ${({ theme }) => theme.colors.text}; }
  p { color: ${({ theme }) => theme.colors.textSecondary}; font-size: 16px; }
`;

const SocialButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 24px;
`;

const SocialButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { background: ${({ theme }) => theme.colors.gray50}; }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 13px;

  &::before, &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  }
  span { padding: 0 10px; }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .label-row {
    display: flex;
    justify-content: space-between;
    a { font-size: 13px; color: ${({ theme }) => theme.colors.primary}; text-decoration: none; font-weight: 600; }
  }

  label { font-size: 14px; font-weight: 600; color: ${({ theme }) => theme.colors.text}; }

  .input-wrapper {
    position: relative;
    
    .field-icon {
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
      color: ${({ theme }) => theme.colors.textLight};
    }

    input {
      width: 100%;
      padding: 12px 14px 12px 42px;
      border-radius: 8px;
      border: 1px solid ${({ theme }) => theme.colors.border};
      font-size: 15px;
      outline: none;
      transition: all 0.2s;
      &:focus { border-color: ${({ theme }) => theme.colors.primary}; box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}15; }
    }

    .toggle-password {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: ${({ theme }) => theme.colors.textLight};
      cursor: pointer;
    }
  }
`;

const SubmitButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
  transition: opacity 0.2s;
  &:hover { opacity: 0.9; }
`;

const Footer = styled.div`
  margin-top: 32px;
  text-align: center;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  a { color: ${({ theme }) => theme.colors.primary}; font-weight: 700; text-decoration: none; }
`;

const VisualSection = styled.section`
  flex: 1.2;
  background-image: url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1964');
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 900px) { display: none; }

  .overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}CC 0%, #000 100%);
  }

  .content {
    position: relative;
    z-index: 1;
    padding: 60px;
    width: 100%;
    max-width: 600px;
  }
`;

const QuoteCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  padding: 40px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;

  .stars { color: #FFD700; margin-bottom: 20px; font-size: 20px; }
  p { font-size: 24px; line-height: 1.4; margin-bottom: 30px; font-weight: 500; }
  
  .author {
    display: flex;
    flex-direction: column;
    strong { font-size: 18px; }
    span { opacity: 0.7; font-size: 14px; }
  }
`;