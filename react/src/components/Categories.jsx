import React, { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import ProductList from './ProductsList';
import beg from "../img/beg.webp";
import borstva from "../img/borstva.webp";
import fitness from "../img/fitness.webp";
import footbal from "../img/footbal.webp";
import gor from "../img/gor.webp";
import hockey from "../img/hockey.webp";
import kemping from "../img/kemping.jpg";
import lizhy from "../img/lizhy.webp";
import plav from "../img/plav.webp";
import plaz from "../img/plaz.jpg";
import roliki from "../img/roliki.jpg";
import samokat from "../img/samokat.jpg";
import tracking from "../img/tracking.jpg";
import velo from "../img/velo.jpg";
import yoga from "../img/yoga.webp";

const Categories = () => {


    return (
            <div className="container">
                <div className="title p20">Популярные категории</div>

                <div className="category">
                    <Link to={'/category/1'} className="category__item">Толстовки и худи</Link>
                    <Link to={'/category/2'} className="category__item">Кросовки и кеды</Link>
                    <Link to={'/category/4'} className="category__item">Брюки и легинсы</Link>
                    <Link to={'/category/5'} className="category__item">Все для кемпинга</Link>
                    <Link to={'/category/6'} className="category__item">Футболки</Link>
                    <Link to={'/category/7'} className="category__item">Сумки</Link>
                    <Link to={'/category/8'} className="category__item">Носки</Link>
                    <Link to={'/category/9'} className="category__item">Рюкзаки</Link>
                    <Link to={'/category/10'} className="category__item">Массажеры</Link>
                    <Link to={'/category/11'} className="category__item">Самокаты</Link>
                    <Link to={'/category/12'} className="category__item">Фонари</Link>
                </div>
                <div className="title p20">
                    Виды спорта
                </div>
                <div className="sport">
                    <Link to={'/category/13'} className="sport__item">
                        <div className="sport__item-img">
                            <img src={beg} alt=""/>
                        </div>
                        <div className="sport__item-text">
                            Бег
                        </div>
                    </Link>
                    <Link to={'/category/14'} className="sport__item">
                        <div className="sport__item-img">
                            <img src={borstva} alt=""/>
                        </div>
                        <div className="sport__item-text">
                            Единоборства
                        </div>
                    </Link>
                    <Link to={'/category/15'} className="sport__item">
                        <div className="sport__item-img">
                            <img src={fitness} alt=""/>
                        </div>
                        <div className="sport__item-text">
                            Тренажеры и фитнес
                        </div>
                    </Link>
                    <Link to={'/category/16'} className="sport__item">
                        <div className="sport__item-img">
                            <img src={footbal} alt=""/>
                        </div>
                        <div className="sport__item-text">
                            Футбол
                        </div>
                    </Link>
                    <Link to={'/category/17'} className="sport__item">
                        <div className="sport__item-img">
                            <img src={gor} alt=""/>
                        </div>
                        <div className="sport__item-text">
                            Горные лыжи
                        </div>
                    </Link>
                    <Link to={'/category/18'} className="sport__item">
                        <div className="sport__item-img">
                            <img src={hockey} alt=""/>
                        </div>
                        <div className="sport__item-text">
                            Хоккей
                        </div>
                    </Link>
                    <Link to={'/category/19'} className="sport__item">
                        <div className="sport__item-img">
                            <img src={kemping} alt=""/>
                        </div>
                        <div className="sport__item-text">
                            Все для кемпинга
                        </div>
                    </Link>
                    <Link to={'/category/20'} className="sport__item">
                        <div className="sport__item-img">
                            <img src={lizhy} alt=""/>
                        </div>
                        <div className="sport__item-text">
                            Беговые лыжи
                        </div>
                    </Link>
                    <Link to={'/category/21'} className="sport__item">
                        <div className="sport__item-img">
                            <img src={plav} alt=""/>
                        </div>
                        <div className="sport__item-text">
                            Все для плавания
                        </div>
                    </Link>
                    <Link to={'/category/22'} className="sport__item">
                        <div className="sport__item-img">
                            <img src={plaz} alt=""/>
                        </div>
                        <div className="sport__item-text">
                            Все для пляжа
                        </div>
                    </Link>
                    <Link to={'/category/23'} className="sport__item">
                        <div className="sport__item-img">
                            <img src={roliki} alt=""/>
                        </div>
                        <div className="sport__item-text">
                            Ролики
                        </div>
                    </Link>
                    <Link to={'/category/24'} className="sport__item">
                        <div className="sport__item-img">
                            <img src={samokat} alt=""/>
                        </div>
                        <div className="sport__item-text">
                            Самокаты
                        </div>
                    </Link>

                    <Link to={'/category/25'} className="sport__item">
                        <div className="sport__item-img">
                            <img src={tracking} alt=""/>
                        </div>
                        <div className="sport__item-text">
                            Треккинг
                        </div>
                    </Link>
                    <Link to={'/category/26'} className="sport__item">
                        <div className="sport__item-img">
                            <img src={velo} alt=""/>
                        </div>
                        <div className="sport__item-text">
                            Велоспорт
                        </div>
                    </Link>

                    <Link to={'/category/27'} className="sport__item">
                        <div className="sport__item-img">
                            <img src={yoga} alt=""/>
                        </div>
                        <div className="sport__item-text">Йога</div>
                    </Link>

                </div>
            </div>
    );
};

export default Categories;
