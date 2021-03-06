import React from 'react'

const Imagen = ({ imagen }) => {

    //extraer las variables
    const { largeImageURL, likes, tags, views } = imagen;
    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card">
                <img src={largeImageURL} alt={tags} className="card-img-top" />
            </div>

            <div className="card-body" >
                <p className="card-text" >{likes} Me gustas</p>
                <p className="card-text" >{views} Vistas</p>
            </div>

            <div className="card-footer">
                <a
                    href={largeImageURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-block"
                >
                    Ver Imagen
                </a>
            </div>

        </div>
    )
}

export default Imagen
