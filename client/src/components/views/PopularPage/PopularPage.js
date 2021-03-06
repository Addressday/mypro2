import React, { useEffect, useState, useRef } from 'react'
import { Typography, Row } from 'antd';
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE } from '../../Config'
import GridCard from '../../commons/GridCards'
const { Title } = Typography;
function PopularPage() {
    const buttonRef = useRef(null);

    const [Movies, setMovies] = useState([])
    const [Loading, setLoading] = useState(true)
    const [CurrentPage, setCurrentPage] = useState(0)
    const noImage = require('../../../assets/images/no_image.png');

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`;
        fetchMovies(endpoint)
    }, [])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, [])


    const fetchMovies = (endpoint) => {

        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                // console.log(result)
                // console.log('Movies',...Movies)
                // console.log('result',...result.results)
                setMovies([...Movies, ...result.results])
                setCurrentPage(result.page)
            }, setLoading(false))
            .catch(error => console.error('Error:', error)
            )
    }

    const loadMoreItems = () => {
        let endpoint = '';
        setLoading(true)
        console.log('CurrentPage', CurrentPage)
        endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-KR&page=${CurrentPage + 1}`;
        fetchMovies(endpoint);
    }

    const handleScroll = () => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight - 1) {

            // loadMoreItems()
            console.log('clicked')
            buttonRef.current.click();

        }
    }

    return (
        <div style={{ width: '100%', margin: '0' }}>

            <div style={{ width: '85%', margin: '1rem auto' }}>

                <Title level={2} > 인기영화 </Title>
                <hr />
                <Row gutter={[16, 16]}>
                    {Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCard
                                image={movie.poster_path ?
                                    `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                                    : noImage}
                                movieId={movie.id}
                                movieName={movie.original_title}
                            />
                        </React.Fragment>
                    ))}
                </Row>

                {Loading &&
                    <div>로딩...</div>}

                <br />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button ref={buttonRef} className="loadMore" onClick={loadMoreItems}>더 불러오기</button>
                </div>
            </div>

        </div>
    )
}

export default PopularPage
