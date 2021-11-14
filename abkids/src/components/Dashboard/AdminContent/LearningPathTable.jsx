import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Input, Button, Popconfirm, Form, Select, message } from "antd";
import LearningPathAction from "../../../actions/LearningPath/LearningPathAction";
import GameActions from "../../../actions/Games/GameActions";
const EditableContext = React.createContext(null);
const { Option } = Select;
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form} style={{ overflowY: "scroll" }}>
        <tr {...props}  />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  levelcontent,
  setLevelcontent,
  setNodes,
  setGames,
  ...restProps
}) => {
  // states

  const [editing, setEditing] = useState(false);
  const [selectedGame, setSelectedGame] = useState();
  const [selectedId, setSelectedId] = useState();
  // const [levelcontent, setLevelcontent]=useState();
  const [field, setField] = useState();

  const [allGames, setAllGames] = useState([]);
  const [gameData, setGameData] = useState();
  const inputRef = useRef(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    // LearningPathAction.viewLearningPathData("prekg").then((response) =>
    //   console.log("VIEW", response)
    // );
    GameActions.getAllGames()
      .then((response) => {
        if (response.data.data) {
          setAllGames(response.data.data);
        } else {
        }
      })
      .catch((error) => {
        message.error("Couldn't get game details");
        console.log(error);
      });
    if (editing) {
      inputRef.current.focus();
      setField(title);
    }
  }, []);

  useEffect(() => {
    fetchGameData();
  }, [selectedId, record]);
  const fetchGameData = () => {
    if (selectedId)
      GameActions.getgameData(selectedId)
        .then((response) => {
          console.log("DATADATA", response);
          if (response.data.data) {
            setGameData(response.data.data);
            if (response.data.data.length) setLevelcontent(response.data.data);
          } else {
            // message.error("Couldn't fetch Game data");
          }
        })
        .catch(() => {
          // message.error("Unable to fetch game data");
        });
  };
  const handleChange = (value, key) => {
    if (dataIndex === "game") {
      setSelectedGame(value);
      setSelectedId(key.key);
      setGames(key.key, record.key);
    }
    if (dataIndex === "level") {
      setNodes({ gameDataId: key.key }, record.key);
    }
  };
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async (e) => {
    e.preventDefault();
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave(e, { ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };
  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
        initialValue="hi"
      >
        <Select
          style={{ width: 120 }}
          onSelect={(key, value) => handleChange(key, value)}
          onPressEnter={(e) => save(e)}
          onBlur={save}
          ref={inputRef}
        >
          {dataIndex === "game"
            ? allGames
              ? allGames.map((game) => (
                  <Option key={game._id} value={game.name}>
                    {game.name}
                  </Option>
                ))
              : ""
            : dataIndex === "level"
            ? levelcontent
              ? levelcontent.map((level) => (
                  <Option key={level._id} value={level.level}>
                    {level.level}
                  </Option>
                ))
              : ""
            : ""}
        </Select>
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

class LearningPathTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "Node",
        dataIndex: "key",
        width: "30%",
        // editable: true,
      },
      {
        title: "Game",
        dataIndex: "game",
        editable: true,
      },
      {
        title: "Level",
        dataIndex: "level",
        editable: true,
      },
      {
        title: "Operation",
        dataIndex: "operation",
        render: (_, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.handleDelete(record.key)}
            >
              <a>Delete</a>
            </Popconfirm>
          ) : null,
      },
    ];

    this.state = {
      dataSource: [],
      count: 1,
      levelcontent: [],
      allGames: [],
      nodes: [],
      games: [],
      grade: "",
      learnignPathId: "",
    };
  }
  componentDidMount() {
    const gradeLower = this.props.grade.toLowerCase().replace(/ +/g, "");
    this.setState({ grade: gradeLower },()=>{this.fetchData()});
    console.log("DATAA", this.state.grade);
    
  }

  fetchData = () => {
    LearningPathAction.viewLearningPathData(this.state.grade)
      .then(
        (response) => {
          console.log("VIEW", response);
          if (response.data.data) {
            this.setState({ dataSource: response.data.data});
          }
        }
        // else{

        // }
      )
      .catch(() => {
        // message.error("Unable to fetch game data");
      });
    // console.log("GRADe", gradeLower);
  };
  setLevelcontent = (data) => {
    this.setState({ levelcontent: data });
  };

  setGames = (gameId, key) => {
    const games = [...this.state.games];
    if (games.length < key) games.push(gameId);
    else if (games[key - 1] !== gameId) {
      games[key - 1] = gameId;
      const nodes = [...this.state.nodes].filter(
        (node, index) => index !== key - 1
      );
      this.setState({ nodes: nodes }, () => {
        const newdata = [...this.state.dataSource];
        newdata[key - 1].level = 0;
        this.setState({
          dataSource: newdata,
        });
      });
    }
    this.setState({ games: games }, () =>
      console.log("Game data", this.state.games)
    );
  };

  setNodes = (node, key) => {
    const nodes = [...this.state.nodes];
    if (nodes.length <= key) {
      nodes[key - 1] = node;
    } else nodes.push(node);
    this.setState({ nodes: nodes }, () => {
      // console.log("DUM", this.state.nodes);
    });
  };

  handleDelete = (key) => {
    var dataSource = [...this.state.dataSource];
    var nodes = [...this.state.nodes];
    dataSource = dataSource.filter((item) => item.key !== key);
    nodes = nodes.filter((item, index) => index !== key - 1);

    dataSource.forEach((item, index) => (item.key = index + 1));
    this.setState(
      {
        dataSource: dataSource,
        count: this.state.count - 1,
        nodes: nodes,
      },
      () => {
        // console.log("DUM", this.state.nodes)
      }
    );
  };

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      game: "game",
      level: 0,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };
  handleSave = (e, row) => {
    // e.preventDefault()
    // console.log("Roww", row);
    const newData = [...this.state.dataSource];
    // console.log("saved Data", newData, this.state.dataSource, row);
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
  };

  saveLearningPathHandler = (e) => {
    const payload = { grade: this.state.grade, nodes: this.state.nodes };
    console.log("PAY", payload);
    {
      // !this.state.learnignPathId
         LearningPathAction.addLearningPath(payload)
            .then((response) => {
              if (response.data.data) {
                message.success("updated path");
                this.fetchData();
                // console.log("reS", response.data.data._id);
                this.setState({ learnignPathId: response.data.data._id });
              } else {
                message.error("couldn't update path");
              }
            })
            .catch((error) => {
              message.error("couldn't updated path");
            })
        // : LearningPathAction.updateLearningPath(
        //     this.state.learnignPathId,
        //     payload
        //   )
        //     .then((response) => {
        //       if (response.data.data) {
        //         message.success("updated path");
        //         this.fetchData();

        //         // console.log("reS", response);
        //       } else {
        //         message.error("Couldn't update path");
        //       }
        //     })
        //     .catch((error) => {
        //       message.error("Couldn't updated= path");
        //     });
    }
  };
  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
          levelcontent: this.state.levelcontent,
          setLevelcontent: this.setLevelcontent,
          setNodes: this.setNodes,
          setGames: this.setGames,
        }),
      };
    });
    return (
      <div>
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          Add a Node
        </Button>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
        <Button onClick={(e) => this.saveLearningPathHandler(e)}>Save</Button>
      </div>
    );
  }
}

export default LearningPathTable;
