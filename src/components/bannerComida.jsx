import React from 'react';
import '../css/components/bannerComida.css';
import { Icon } from '@iconify/react';

const Component = () => {
  return (
    <section className="info-section">
      <div className="info-text">
        <article className="info-item">
          <Icon icon="mdi:fish-food" className="info-icon" />
          <div>
            <h2>Sabor Autêntico</h2>
            <p>
              O verdadeiro gostinho de buteco, com receitas que despertam memórias e conquistam no primeiro pedaço.
            </p>
          </div>
        </article>

        <article className="info-item">
          <Icon icon="simple-icons:codefresh" className="info-icon" />
          <div>
            <h2>Ingredientes Premium</h2>
            <p>
              Selecionamos apenas ingredientes frescos e de alta qualidade para garantir o melhor sabor em cada prato.
            </p>
          </div>
        </article>

        <article className="info-item">
          <Icon icon="ion:book-sharp" className="info-icon" />
          <div>
            <h2>Cardápio Original</h2>
            <p>
            Combinações únicas, inspiradas na cultura brasileira, que surpreendem e encantam em cada visita.
            </p>
          </div>
        </article>
      </div>

      <div className="info-images">
        <img src="https://images.unsplash.com/photo-1653681472495-0a62d97e37fb?q=80&w=731&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Prato típico brasileiro com feijão, farinha e linguiça" />
        <img src="https://images.unsplash.com/photo-1641848421532-b27f3819071c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Coxinhas servidas sobre pano xadrez" />
      </div>
    </section>
  );
};

export default Component;
