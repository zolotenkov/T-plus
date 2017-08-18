import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import BurgerButton from './BurgerButton';
import Scene from './Scene';
import Social from './Social';


const Stages = {
  Rules: 'RULES',
  Game: 'GAME',
  Pause: 'PAUSE',
  EndGame: 'ENDGAME',
};

const defaultState = {
  score: 0,
  time: 5 * 60,
  stage: Stages.Rules,
  scale: 0,

  timeIsOut: true,
  showRightPanel: true,

  id: 0,

  cable: false,
  'coffee-maker': false,
  extension_cable: false,
  hoover: false,
  hoover_2: false,
  lamp_in_corridor: false,
  lamp_near_bad: false,
  lamp_near_mirror: false,
  'pan-item': false,
  pc_back: false,
  pc_face: false,
  powerbank: false,
  stove: false,
  window: false,
};

/**
 * @param {HTMLElement} node
 */
function hide(node) {
  node.style.display = 'none';
}

function hideStuff(className) {
  document.querySelectorAll(`.${className}`).forEach(hide);
}

function hideAllStuff(map) {
  Object.keys(map)
        .filter(key => map[key])
        .forEach(hideStuff);
}

var clsDescs = {
   'cable': {'desc':'Разрывы кабелей а так-же много устройств подключенных в один сетевой фильтр провоцируют повышенное потребление электроэнергии в доме, перерасход может быть до 100кВт в месяц. Если вы замените все провода в доме на новые,  не поврежденные а так-же не будете перегружать сеть вы сможете сэкономить до 4.000 рублей в год.'},
   'coffee-maker': {'desc':'Кофемашина в режиме ожидания может потреблять до 20кВт в месяц. В течении года выключая кофемашину после использования вы можете сэкономить до 1000 рублей.'},
   'extension_cable': {'desc':'Разрывы кабелей а так-же много устройств подключенных в один сетевой фильтр провоцируют повышенное потребление электроэнергии в доме, перерасход может быть до 100кВт в месяц. Если вы замените все провода в доме на новые,  не поврежденные а так-же не будете перегружать сеть вы сможете сэкономить до 4.000 рублей в год.'},
   'hoover': {'desc':'Не выключенный из сети пылесос потребляет до 10 кВт в месяц. Робот пылесос в режиме ожидания и зарядки может потреблять до 5 кВт в месяц. Обязательно отключайте их от сети после того как закончили уборку в квартире, вы сможете сэкономить до 1500 рублей в год.'},
   'hoover_2': {'desc':'Не выключенный из сети пылесос потребляет до 10 кВт в месяц. Робот пылесос в режиме ожидания и зарядки может потреблять до 5 кВт в месяц. Обязательно отключайте их от сети после того как закончили уборку в квартире, вы сможете сэкономить до 1500 рублей в год.'},
   'lamp_in_corridor': {'desc':'Освещение в квартире может расходовать до 100кВт в месяц. Просто выключая ненужное освещение в комнатах вы можете сэкономить до 3000 рублей в год.'},
   'lamp_near_bad': {'desc':'Освещение в квартире может расходовать до 100кВт в месяц. Просто выключая ненужное освещение в комнатах вы можете сэкономить до 3000 рублей в год.'},
   'lamp_near_mirror': {'desc':'Освещение в квартире может расходовать до 100кВт в месяц. Просто выключая ненужное освещение в комнатах вы можете сэкономить до 3000 рублей в год.'},
   'pan-item': {'desc':'Электроплита потребляет до 150 кВт в месяц при использовании в течении 1 часа в день. Если вы начнете подбирать комфорки под размер посуды и не будете оставлять комфорку включенной после приготовления еды, то вы сэкономите до 6000 рублей в течении года.'},
   'pc_back': {'desc':'Не выключенный компьютер потребляет до 35кВт в месяц. В течении года просто выключая питание не используемого компьютера вы можете сэкономить 1260 рублей.'},
   'pc_face': {'desc':'Не выключенный компьютер потребляет до 35кВт в месяц. В течении года просто выключая питание не используемого компьютера вы можете сэкономить 1260 рублей.'},
   'powerbank': {'desc':'Включенный PowerBank а так-же зарядные устройства подключенные к сети но не заряжающие Ваши устройства расходуют электроэнергию до 10 кВт в месяц. Отключив их вы сможете сэкономить до 2.000 рублей в год.'},
   'stove': {'desc':'Электроплита потребляет до 150 кВт в месяц при использовании в течении 1 часа в день. Если вы начнете подбирать комфорки под размер посуды и не будете оставлять комфорку включенной после приготовления еды, то вы сэкономите до 6000 рублей в течении года.'},
   'window': {'desc':'Утепляйте деревянные окна или замените их на пластиковые стеклопакеты, утечка теплого воздуха в холодное время года повышает расход электроэнергии в доме почти в 2 раза при включенных обогревателях. Сделав это вы сможете сэкономить до 6.000 рублей в год.'}
}

export default class Game extends Component {
  constructor() {
    super();
    this.state = defaultState;
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.restart = this.restart.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    window.svgClick = this.onSvgClick.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    window.svgClick = this.onSvgClick.bind(this);
  }

  componentWillUnmount() {
    clearInterval(this.tickInterval);
  }

  onSvgClick(el,x,y) {
    this.addScore.call(this, el, x, y, 'cable');
    this.addScore.call(this, el, x, y, 'coffee-maker');
    this.addScore.call(this, el, x, y, 'extension_cable');
    this.addScore.call(this, el, x, y, 'hoover');
    this.addScore.call(this, el, x, y, 'hoover_2');
    this.addScore.call(this, el, x, y, 'lamp_in_corridor');
    this.addScore.call(this, el, x, y, 'lamp_near_bad');
    this.addScore.call(this, el, x, y, 'lamp_near_mirror');
    this.addScore.call(this, el, x, y, 'pan-item');
    this.addScore.call(this, el, x, y, 'pc_back');
    this.addScore.call(this, el, x, y, 'pc_face');
    this.addScore.call(this, el, x, y, 'powerbank');
    this.addScore.call(this, el, x, y, 'stove');
    this.addScore.call(this, el, x, y, 'window');

    if (this.state.cable &&
        this.state['coffee-maker'] &&
        this.state.extension_cable &&
        this.state.hoover &&
        this.state.hoover_2 &&
        this.state.lamp_in_corridor &&
        this.state.lamp_near_bad &&
        this.state.lamp_near_mirror &&
        this.state['pan-item'] &&
        this.state.pc_back &&
        this.state.pc_face &&
        this.state.powerbank &&
        this.state.stove &&
        this.state.window
      ) {
      this.setState({
        stage: Stages.EndGame,
        timeIsOut: false,
      });
      clearInterval(this.tickInterval);
    }
  }

  addScore(child, x, y, className) {
      let el = this.findAncestor(child,className);
      if (el) {
          hideStuff(className);
          this.showItemDesc(x,y,className);

          if (!this.state[className]) {
              this.score += 10;
          }
          this.setState({ [className]: true });
      }
  }

  showItemDesc(x,y,cls) {
     var main = document.getElementById('main');
     if(!x) x = main.clientWidth / 2; if(!y) y = main.clientHeight / 2; 
     var id = "d" + new Date().getTime();
     var str = "<div class='itmAlert' id='" + id + "' style='" + "left:" + x + "px; top:" + y + "px;" + "'>" + clsDescs[cls].desc + "</div>";
     document.documentElement.insertAdjacentHTML( 'beforeend', str );
     var div = document.getElementById(id);
     div.addEventListener("click", function(){ div.remove(); });
     setTimeout(function(){ div.className = "itmAlert fadeOut"; setTimeout(function(){ div.remove(); },1000); }, 7000);
  }

  findAncestor (el, cls) {
      if(el.classList.contains(cls)) return el;
      while ((el = el.parentElement) && !el.classList.contains(cls));
      return el;
  }

  get sceneSize() {
    return {
      height: `${98 + 20 * this.state.scale}%`,
    };
  }

  get score() {
    return this.state.score;
  }

  set score(value) {
    this.setState({ score: value });
  }

  get scale() {
    return this.state.scale;
  }
  set scale(value) {
    if (value < 0 || value > 10) {
      return;
    }
    this.setState({ scale: value });
    this.restoreScene();
  }

  start() {
    this.setState({
      stage: Stages.Game,
      id: this.state.id + 1,
      showRightPanel: false,
    });
    this.restoreScene();
    this.tickInterval = setInterval(this.tick, 1000);
  }

  pause() {
    clearInterval(this.tickInterval);
    this.setState({ stage: Stages.Pause });
  }

  restart() {
    this.setState(defaultState);
  }

  tick() {
    const nextTime = this.state.time - 1;
    if (nextTime < 0) {
      clearInterval(this.tickInterval);
      this.setState({ stage: Stages.EndGame });
      return;
    }
    this.setState({ time: nextTime });
  }

  get time() {
    const minutes = Math.floor(this.state.time / 60);
    const seconds = this.state.time % 60;
    return `${minutes}:${seconds < 10 ? 0 : ''}${seconds}`;
  }

  restoreScene() {
    setTimeout(hideAllStuff, 500, {
      cable: this.state.cable,
      'coffee-maker': this.state['coffee-maker'],
      extension_cable: this.state.extension_cable,
      hoover: this.state.hoover,
      hoover_2: this.state.hoover_2,
      lamp_in_corridor: this.state.lamp_in_corridor,
      lamp_near_bad: this.state.lamp_near_bad,
      lamp_near_mirror: this.state.lamp_near_mirror,
      'pan-item': this.state['pan-item'],
      pc_back: this.state.pc_back,
      pc_face: this.state.pc_face,
      powerbank: this.state.powerbank,
      stove: this.state.stove,
      window: this.state.window,
    });
  }

  render() {
    return (
      <div className="Game">
        <div className="Header">
          <div className="Grid-left">
            <img src="img/logo.png" className="Header--logo" alt="t+" />
            <div className="Header--InfoItem" title="Счет">
              <h2>Очки:</h2>
              <span>{this.state.score}</span>
            </div>
            <div className="Header--InfoItem" title="Оставшееся время">
              <h2>Оставшееся время:</h2>
              <span>{this.time}</span>
            </div>
          </div>
          <div className="Grid-right">
            <BurgerButton onClick={this.pause} />
          </div>
        </div>
        <div className="Body">
          <div className={`Grid-left ${this.state.showRightPanel ? '' : 'closed'}`}>
            {
              this.state.stage === Stages.Rules ?
                <div className={`Grid-left GameScene ${this.state.showRightPanel ? '' : 'closed'}`}>
                  <img src="img/scene_shadowed.svg" width="100%" alt="Правила" />
                </div>
                :
                <Scene
                  className={`Grid-left ${this.state.showRightPanel ? '' : 'closed'}`}
                  style={this.sceneSize} id={this.state.id} stage={this.state.stage}
                />
            }
            <button
              className={`GameScene--tip-button ${this.state.showRightPanel ? '' : 'closed'}`}
              onClick={() => { this.setState({ showRightPanel: !this.state.showRightPanel }) }}
            > Подсказки </button>
            <button
              className={`GameScene--plus-scale ${this.state.showRightPanel ? '' : 'closed'}`}
              onClick={() => { this.scale += 1; }}
            />
            <button
              className={`GameScene--minus-scale ${this.state.showRightPanel ? '' : 'closed'}`}
              onClick={() => { this.scale -= 1; }}
            />
          </div>
          {
            this.state.stage === Stages.Rules ?
              <div className={`Grid-right SearchList black ${this.state.showRightPanel ? '' : 'closed'}`}>
                <div className="img black">
                  <img src="img/items/cable.svg" alt="Провод" /><p className="itmTitle">Провод</p>
                </div>
                <div className="img">
                  <img src="img/items/hoover.svg" alt="Робот-пылесос" /><p className="itmTitle">Робот-пылесос</p>
                </div>
                <div className="img black">
                  <img src="img/items/coffee-maker.svg" alt="Кофе-машина" /><p className="itmTitle">Кофе-машина</p>
                </div>
                <div className="img black">
                  <img src="img/items/extension_cable.svg" alt="Удлинитель" /><p className="itmTitle">Удлинитель</p>
                </div>
                <div className="img black">
                  <img src="img/items/hoover_2.svg" alt="Пылесос" /><p className="itmTitle">Пылесос</p>
                </div>
                <div className="img black">
                  <img src="img/items/lamp_in_corridor.svg" alt="Лампа в коридоре" /><p className="itmTitle">Лампа в коридоре</p>
                </div>
                <div className="img black">
                  <img src="img/items/lamp_near_bad.svg" alt="Лампа у кровати" /><p className="itmTitle">Лампа у кровати</p>
                </div>
                <div className="img black">
                  <img src="img/items/lamp_near_mirror.svg" alt="Лампа у зеркала" /><p className="itmTitle">Лампа у зеркала</p>
                </div>
                <div className="img black">
                  <img src="img/items/pan-item.svg" alt="Кастрюля" /><p className="itmTitle">Кастрюля</p>
                </div>
                <div className="img black">
                  <img src="img/items/pc_back.svg" alt="Компьютер, задняя панель" /><p className="itmTitle">Компьютер, задняя панель</p>
                </div>
                <div className="img black">
                  <img src="img/items/pc_face.svg" alt="Компьютер, передняя панель" /><p className="itmTitle">Компьютер, передняя панель</p>
                </div>
                <div className="img black">
                  <img src="img/items/powerbank.svg" alt="Повербанк" /><p className="itmTitle">Повербанк</p>
                </div>
                <div className="img black">
                  <img src="img/items/stove.svg" alt="Плита" /><p className="itmTitle">Плита</p>
                </div>
                <div className="img black">
                  <img src="img/items/window.svg" alt="Окно" /><p className="itmTitle">Окно</p>
                </div>
              </div>
            :
              <div className={`Grid-right SearchList ${this.state.showRightPanel ? '' : 'closed'}`}>
                <div className={`img ${this.state.cable ? 'gray' : ''}`}>
                  <img src="img/items/cable.svg" alt="Провод" /><p className="itmTitle">Провод</p>
                </div>
                <div className={`img ${this.state['coffee-maker'] ? 'gray' : ''}`}>
                  <img src="img/items/coffee-maker.svg" alt="Кофе-машина" /><p className="itmTitle">Кофе-машина</p>
                </div>
                <div className={`img ${this.state.extension_cable ? 'gray' : ''}`}>
                  <img src="img/items/extension_cable.svg" alt="Удлинитель" /><p className="itmTitle">Удлинитель</p>
                </div>
                <div className={`img ${this.state.hoover ? 'gray' : ''}`}>
                  <img src="img/items/hoover.svg" alt="Робот-пылесос" /><p className="itmTitle">Робот-пылесос</p>
                </div>
                <div className={`img ${this.state.hoover_2 ? 'gray' : ''}`}>
                  <img src="img/items/hoover_2.svg" alt="Пылесос" /><p className="itmTitle">Пылесос</p>
                </div>
                <div className={`img ${this.state.lamp_in_corridor ? 'gray' : ''}`}>
                  <img src="img/items/lamp_in_corridor.svg" alt="Лампа в коридоре" /><p className="itmTitle">Лампа в коридоре</p>
                </div>
                <div className={`img ${this.state.lamp_near_bad ? 'gray' : ''}`}>
                  <img src="img/items/lamp_near_bad.svg" alt="Лампа у кровати" /><p className="itmTitle">Лампа у кровати</p>
                </div>
                <div className={`img ${this.state.lamp_near_mirror ? 'gray' : ''}`}>
                  <img src="img/items/lamp_near_mirror.svg" alt="Лампа у зеркала" /><p className="itmTitle">Лампа у зеркала</p>
                </div>
                <div className={`img ${this.state['pan-item'] ? 'gray' : ''}`}>
                  <img src="img/items/pan-item.svg" alt="Кастрюля" /><p className="itmTitle">Кастрюля</p>
                </div>
                <div className={`img ${this.state.pc_back ? 'gray' : ''}`}>
                  <img src="img/items/pc_back.svg" alt="Компьютер, задняя панель" /><p className="itmTitle">Компьютер, задняя панель</p>
                </div>
                <div className={`img ${this.state.pc_face ? 'gray' : ''}`}>
                  <img src="img/items/pc_face.svg" alt="Компьютер, передняя панель" /><p className="itmTitle">Компьютер, передняя панель</p>
                </div>
                <div className={`img ${this.state.powerbank ? 'gray' : ''}`}>
                  <img src="img/items/powerbank.svg" alt="Повербанк" /><p className="itmTitle">Повербанк</p>
                </div>
                <div className={`img ${this.state.stove ? 'gray' : ''}`}>
                  <img src="img/items/stove.svg" alt="Плита" /><p className="itmTitle">Плита</p>
                </div>
                <div className={`img ${this.state.window ? 'gray' : ''}`}>
                  <img src="img/items/window.svg" alt="Окно" /><p className="itmTitle">Окно</p>
                </div>
              </div>
          }
        </div>
        {
          this.state.stage === Stages.Rules ?
            <div>
              <div className="Rules--tip">
                <h2>Правила</h2>
                <p>
                  Помогите семье из 4 человек начать экономить деньги на электроэнергии. Вам необходимо внимательно посмотреть какие электроприборы не используются в данный момент и могут быть отключены. Так-же необходимо найти утечки тепла из квартиры и всё что может приводить к росту энергопотребления. После того как вы обнаружите такой элемент просто кликните на него, он отключиться и Вам начислятся баллы а так-же вы узнаете сколько денег можно сэкономить. Если вы сомневаетесь или не видите какие еще электроприборы можно отключть нажмите на кнопку с подсказками.
                </p>
                <button className="Rules--tip--button" onClick={this.start}>
                  Начать игру
                </button>
              </div>
            </div>
          : ''
        }
        {
          this.state.stage === Stages.Pause ?
            <div className="Shadow">
              <div className="Pause">
                <h1>Меню</h1>
                <div className="Pause--navbar">
                  <button className="Pause--button" onClick={this.start}>
                    Продолжить
                  </button>
                  <button style={{ marginTop: '2vh' }} className="Pause--button" onClick={this.restart}>
                    Заново
                  </button>
                  <Link className="Pause--button" to="/">
                    Выход
                  </Link>
                </div>
              </div>
            </div>
          : ''
        }
        {
          this.state.stage === Stages.EndGame ?
            <div className="Shadow">
              <div className="EndGame">
                <h1>{this.state.timeIsOut ? 'Время вышло' : 'Поздравляем! Вы нашли все утечки электроэнергии в квартире и всё, что приводит к повышенному энергопотреблению. Теперь благодаря Вам семья сэкономит на электроэнергии до 30.000 рублей в течении года.'}</h1>
                <div className="EndGame--score">
                  Ваш выигрыш
                  <div>{this.state.score}</div>
                </div>
                <Social />
                <Link className="EndGame--button" to="/">
                  Завершить
                </Link>
              </div>
            </div>
          : ''
        }
      </div>
    );
  }
}
