var React = require('react');
var raf = require('raf');
var ease = require('ease-component');

var Counter = React.createClass({
  getInitialState: function() {
    return { value: 0 };
  },
  componentDidMount: function() {
    this.start = Date.now();
    this.setState({value: this.props.begin});
    raf(this.animate.bind(this, this.props));
  },
  componentWillReceiveProps(nextProps) {
    // this.setState({value: nextProps.begin});
    // this.draw(nextProps)
    this.stop=false;
    this.start = Date.now();
    raf(this.animate.bind(this, nextProps));
  },
  shouldComponentUpdate: function(nextProps,nextState){
    return (
      (nextState.value !== this.state.value)
      ||(nextProps.begin !== this.props.begin)
      ||(nextProps.end !== this.props.end)
    );
  },
  animate: function(props) {

    if (this.stop) return;

    raf(this.animate.bind(this, props));
    this.draw(props)
  },

  draw: function(props) {
    if (!this.isMounted()) return;

    var time = props.time;
    var begin = props.begin;
    var end = props.end;
    var easing = props.easing;

    easing = easing && easing in ease ? easing : 'outCube';
    var now = Date.now()
    if (now - this.start >= time) this.stop = true;
    var percentage = (now - this.start) / time;
    percentage = percentage > 1 ? 1 : percentage;
    var easeVal = ease[easing](percentage);
    var val = begin + (end - begin) * easeVal;

    this.setState({ value: val });
  },

  render: function() {
    return React.DOM.span({ className: 'counter' }, Math.round(this.state.value));
  }
});

module.exports = Counter;
