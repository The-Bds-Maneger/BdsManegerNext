import React from "react";

class CreateLog extends React.Component {
  render() {
    const { LogArray } = this.props;
    return (
      <>
        <div>
          {
            [...LogArray||[]].map((item, key) => {
              return (
                <div key={key}>
                  <span>{item}</span>
                </div>
              );
            })
          }
        </div>
      </>
    )
  }
}

class Log extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
      loading: true
    };
  }

  componentDidMount() {
    this.loadLogs();
  }

  loadLogs() {
    this.setState({ loading: true });
    fetch("/BdsAPI/log")
      .then(res => res.json())
      .then(logs => {
        this.setState({ logs, loading: false });
      });
  }

  render() {
    return (
      <>
        {
          !this.state.loading ? <CreateLog LogArray={this,this.state.logs} /> : <span>Loading...</span>
        }
      </>
    )
  }
}

export default Log;