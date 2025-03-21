import React from 'react';

function Cadastro() {
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: '#1e3c72',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    },
    formContainer: {
      background: 'white',
      padding: '2rem',
      borderRadius: '20px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '400px'
    },
    title: {
      textAlign: 'center',
      color: '#1e3c72',
      fontSize: '1.8rem',
      marginBottom: '2rem',
      fontWeight: 'bold',
      position: 'relative',
      paddingBottom: '0.5rem'
    },
    titleAfter: {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '40px',
      height: '2px',
      background: '#1e3c72'
    },
    formGroup: {
      marginBottom: '1.2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    label: {
      color: '#4a5568',
      fontSize: '0.9rem',
      marginBottom: '0.5rem'
    },
    input: {
      width: '90%',
      padding: '0.8rem',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      fontSize: '0.9rem',
      outline: 'none',
      backgroundColor: '#fff',
    },
    inputFocus: {
      borderColor: '#1e3c72',
      boxShadow: '0 0 0 2px rgba(30, 60, 114, 0.1)'
    },
    button: {
      width: '100%',
      padding: '0.8rem',
      background: '#1e3c72',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background 0.2s ease',
      marginTop: '1rem',
      textTransform: 'uppercase'
    },
    buttonHover: {
      background: '#2a5298'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>
          Cadastro
          <div style={styles.titleAfter}></div>
        </h2>
        <form>
          <div style={styles.formGroup}>
            <label style={styles.label}>Nome Completo</label>
            <input
              type="text"
              style={styles.input}
              placeholder="Digite seu nome completo"
              required
              onFocus={e => {
                e.target.style.borderColor = styles.inputFocus.borderColor;
                e.target.style.boxShadow = styles.inputFocus.boxShadow;
              }}
              onBlur={e => {
                e.target.style.borderColor = styles.input.border;
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>E-mail</label>
            <input
              type="email"
              style={styles.input}
              placeholder="Digite seu e-mail"
              required
              onFocus={e => {
                e.target.style.borderColor = styles.inputFocus.borderColor;
                e.target.style.boxShadow = styles.inputFocus.boxShadow;
              }}
              onBlur={e => {
                e.target.style.borderColor = styles.input.border;
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Senha</label>
            <input
              type="password"
              style={styles.input}
              placeholder="Crie uma senha forte"
              required
              onFocus={e => {
                e.target.style.borderColor = styles.inputFocus.borderColor;
                e.target.style.boxShadow = styles.inputFocus.boxShadow;
              }}
              onBlur={e => {
                e.target.style.borderColor = styles.input.border;
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Confirmar Senha</label>
            <input
              type="password"
              style={styles.input}
              placeholder="Confirme sua senha"
              required
              onFocus={e => {
                e.target.style.borderColor = styles.inputFocus.borderColor;
                e.target.style.boxShadow = styles.inputFocus.boxShadow;
              }}
              onBlur={e => {
                e.target.style.borderColor = styles.input.border;
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          
          <button 
            type="submit" 
            style={styles.button}
            onMouseOver={e => {
              e.currentTarget.style.background = styles.buttonHover.background;
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = styles.button.background;
            }}
          >
            Criar Conta
          </button>
        </form>
      </div>
    </div>
  );
}

export default Cadastro; 