import '../Introduce/Introduce.scss';

import avatar from '../../assets/avatar.jpg';

const Introduce = () => {
    return (
      
        <article className="introduce__container">

                <h2 className="introduce__title">Que fait<span className="introduce__title__interrogatoire"><span className="introduce__title__color">QualiExtra</span>?</span></h2>

                <div className="introduce__container__flex">

                    <section className="introduce__text">

                        <p className="introduce__text__paragraph">
                            <span className="introduce__text__color">L'objectif</span> ? Créer des souvenirs magiques sans partir à l'autre bout du monde.
                        </p>

                        <p className="introduce__text__paragraph">
                            On vous permet de booker des expériences complètes à vivre seul, à deux, entre amis, sur Paris.
                        </p>

                        <p className="introduce__text__paragraph">

                            <span className="introduce__text__bold">On s'adapte à votre envie du moment</span> : on vous trouve <span className="introduce__text__bold">THE activité</span> dans votre quartier préféré et on y ajoute une nuit dans un établissement d'excellence/ un resto italien qui fait les carbonaras comme cess de la Mamma/ un spécialiste du hot-dog végan...

                        </p>

                        <p className="introduce__text__paragraph">
                            Vous y pensez, <span className="introduce__text__color">on va le trouver</span>.
                        </p>

                    </section>

                    <section >
                        <figure className="introduce__figure">
                            <img src={avatar} alt="" className="introduce__img"></img>
                            <figcaption className="introduce__fondateur">
                                <span className="introduce__name">Arnaud</span>
                                Fondateur
                            </figcaption>
                        </figure>
                    </section>
                </div>
                </article>
)
}

    


export default Introduce;