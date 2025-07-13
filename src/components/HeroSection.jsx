function HeroSection() {
  return (
    <section
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(https://static.vecteezy.com/system/resources/previews/015/462/130/large_2x/delicious-food-group-of-young-friends-sitting-together-in-bar-with-beer-photo.jpg)`, backgroundRepeat: "none",
        backgroundPosition: "center",
        backgroundSize: "cover",
        minHeight: "120vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center"
      }}
    >
      <div
        style={{
          maxWidth: "800px"
        }}
      >
        <h1 style={{ fontSize: "60px" }}>Uma viagem pela culinaria exotica de Boteco</h1>
        <p style={{ fontSize: "18px", marginTop: "20px", }}>
          Boteko Raiz, no coração do bairro Jd Santa Terezinha. Ambiente familiar e muito descontraído para estar com seus amigos . Servimos porções deliciosas feitas com muito capricho e bem gourmet para um botequinho, lanches artesanais com carne 100% bovina. Cerveja gelada, drinks, caipirinhas . Aqui você trás sua galera faz aquele churrasco. Cadeira na calçada , área debaixo de uma árvore com sombra bem gostosa . Ambiente aberto arejado … perfeito pra curtir com a sua turma
        </p>
        <button
          style={{
            marginTop: "20px",
            border: "none",
            color: "#FC6102",
            fontSize: "20px",
            padding: "10px 0",
            backgroundColor: "transparent",
            borderTop: "2px solid #FC6102",
            borderBottom: "2px solid #FC6102",

          }}
        >CARDAPIO</button>
      </div>
    </section>
  )
}

export default HeroSection;