/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';

// Libraries
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
// helper
import { format } from 'date-fns';
import sender from 'helper/sender';

// Components
import { Flex, Text, Button, FormControl, FormLabel, Select, Box } from '@chakra-ui/react';

import PageContainer from '@/components/layout/PageContainer';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, ChartDataLabels);

export const barChartOption = {
  responsive: true,
  plugins: {
    ChartDataLabels,
    datalabels: {
      formatter(value, context) {
        return `${+(Math.round(value * 100) / 100).toFixed(2)}`;
      },
      labels: {
        title: {
          color: 'white',
        },
      },
    },
    legend: {
      // position: 'bottom' as const,
      display: false,
    },

    title: {
      display: false,
      text: 'Bar Chart',
    },
  },
};

export const options = {
  responsive: true,
  plugins: {
    ChartDataLabels,
    datalabels: {
      formatter(value, context) {
        return `${+(Math.round(value * 100) / 100).toFixed(2)}%`;
      },
      labels: {
        title: {
          color: 'white',
        },
      },
    },
    legend: {
      position: 'bottom' as const,
      display: true,
    },

    title: {
      display: false,
      text: 'Donught Chart',
    },
  },
};

const Performansi = () => {
  const [tabActive, setTabActive] = useState<string>('daily');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [sourceData, setSourceData] = useState('draft');
  const [responseData, setResponseData] = useState<any>();
  const [isFetching, setIsFetching] = useState<boolean>(false);

  // console.log('options', options);

  const submitHandler = async (start, end, source) => {
    setIsFetching(true);
    const start_date = format(new Date(start), 'yyyy-MM-dd');
    const end_date = format(new Date(end), 'yyyy-MM-dd');

    const response = await sender('/api/v1/chart', { start_date, end_date, source }, localStorage.getItem('token'));
    setResponseData(response.data);
    setIsFetching(false);
  };

  // const randomColorGenerator = () => Math.floor(Math.random() * 16777215).toString(16);
  function randomColorGenerator() {
    let color = '';
    for (let i = 0; i < 3; i += 1) color += `0${Math.floor((Math.random() * 16 ** 2) / 2).toString(16)}`.slice(-2);
    return color;
  }
  const agentMapping = agentData => {
    const agentName = agentData?.map(data => data.name_agent);
    const agentValue = agentData?.map(data => data.hasil * 100);
    const generatedColor = [...Array(agentData?.length)]?.map(_ => `#${randomColorGenerator()}`);

    const datasets = [
      {
        data: agentValue,
        backgroundColor: generatedColor,
        borderWidth: 4,
      },
    ];

    return { labels: agentName, datasets };
  };

  const jenisGangguanMapping = jenisGangguanData => {
    const jenisGangguanName = jenisGangguanData?.map(data => data.jenis_gangguan);
    const jenisGangguanValue = jenisGangguanData?.map(data => data.hasil * 100);
    const generatedColor = [...Array(jenisGangguanData?.length)]?.map(_ => `#${randomColorGenerator()}`);

    const datasets = [
      {
        data: jenisGangguanValue,
        backgroundColor: generatedColor,
        borderWidth: 4,
      },
    ];

    return { labels: jenisGangguanName, datasets };
  };

  const stoMapping = stoData => {
    const stoName = stoData?.map(data => data.sto);
    const stoValue = stoData?.map(data => data.hasil);
    const generatedColor = [...Array(stoData?.length)]?.map(_ => `#${randomColorGenerator()}`);
    const datasets = [
      {
        label: '',
        data: stoValue,
        backgroundColor: generatedColor,
      },
    ];
    // eslint-disable-next-line array-callback-return
    // kenang-kenangan
    // stoData.map(data => {
    //   datasets.push({
    //     label: data.sto,
    //     data: [data.hasil],
    //     backgroundColor: `#${randomColorGenerator()}`,
    //   });
    // });
    return { labels: stoName, datasets };
  };

  return (
    <PageContainer>
      <Flex flexDirection="column">
        <Text variant="heading" fontSize="3rem" mt="5vh" mb="5vh">
          Report Performansi
        </Text>
        <Flex className="tab-wrapper" mb="50px">
          <Button
            background={tabActive === 'daily' ? 'primary' : 'white'}
            color={tabActive === 'daily' ? 'white' : 'primary'}
            onClick={() => setTabActive('daily')}
            minW="200px"
            marginX="10px"
            height="40px"
            border="2px solid"
            borderColor="primary"
          >
            <Text fontSize="20px">Daily</Text>
          </Button>
          <Button
            background={tabActive === 'monthly' ? 'primary' : 'white'}
            color={tabActive === 'monthly' ? 'white' : 'primary'}
            onClick={() => setTabActive('monthly')}
            minW="200px"
            mr={3}
            marginX="10px"
            border="2px solid"
            borderColor="primary"
          >
            <Text fontSize="20px">Monthly</Text>
          </Button>
        </Flex>
      </Flex>
      <Flex
        className="content-wrapper"
        marginX="10px"
        padding="5px"
        display="inline-flex"
        minWidth={{ base: '100%', md: '80%' }}
        mb="25px"
      >
        <Flex
          className="date-form-wrapper"
          flexDirection={{ base: 'column', md: 'row' }}
          minWidth={{ base: '100%', md: '80%' }}
          alignItems={{ base: 'center', md: 'flex-start' }}
        >
          <FormControl mb="15px" mx="5px">
            <FormLabel>
              <Text>Start Date</Text>
            </FormLabel>
            <DatePicker
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              dateFormat="dd-MM-yyyy"
              className="datepicker-input"
            />
          </FormControl>
          {tabActive === 'monthly' && (
            <FormControl mb="15px" mx="5px">
              <FormLabel>
                <Text>End Date</Text>
              </FormLabel>
              <DatePicker
                selected={endDate}
                onChange={(date: Date) => setEndDate(date)}
                dateFormat="dd-MM-yyyy"
                className="datepicker-input"
              />
            </FormControl>
          )}
          <FormControl minW="200px" mb="15px" mx="5px">
            <FormLabel>
              <Text>Source</Text>
            </FormLabel>
            <Select
              name="source"
              // placeholder="Select option"
              onChange={e => setSourceData(e.target.value)}
              isRequired
              value={sourceData}
            >
              <option value="draft">Draft</option>
              <option value="group">Group</option>
            </Select>
          </FormControl>
          <FormControl minW="200px" mx="5px" alignSelf="center" mt="20px">
            <Button
              background="primary"
              color="white"
              onClick={() => submitHandler(startDate, endDate, sourceData)}
              minW={{ base: '100%', md: '200px' }}
              isLoading={isFetching}
              disabled={isFetching}
            >
              <Text fontSize="20px">Terapkan</Text>
            </Button>
          </FormControl>
        </Flex>
      </Flex>
      {responseData && (
        <Flex className="chart-wrapper" flexWrap="wrap">
          <Flex
            flexDirection="column"
            className="agent-chart-wrapper"
            mx="10px"
            // width="500px"
            width="30%"
            // padding="2rem"
            boxShadow="md"
          >
            <Text fontSize="25px" textAlign="center" fontWeight="bold" mb="20px">
              Report Data Agent
            </Text>
            {responseData.agent.length > 0 ? (
              <Doughnut data={agentMapping(responseData.agent)} options={options} />
            ) : (
              <Text mx="auto">Tidak Ada Data</Text>
            )}
          </Flex>
          <Flex
            flexDirection="column"
            className="agent-chart-wrapper"
            mx="10px"
            width="30%"
            // width="500px"
            // padding="2rem"
            boxShadow="md"
          >
            <Text fontSize="25px" textAlign="center" fontWeight="bold" mb="20px">
              Report Data Gangguan
            </Text>
            {responseData.jenis_gangguan.length > 0 ? (
              <Doughnut data={jenisGangguanMapping(responseData.jenis_gangguan)} options={options} />
            ) : (
              <Text mx="auto">Jenis Gangguan</Text>
            )}
          </Flex>

          <Flex
            width="30%"
            className="sto-chart-wrapper"
            flexDirection="column"
            alignItems="center"
            mt="5vh"
            // padding="2rem"
            boxShadow="md"
          >
            <Text fontSize="25px" textAlign="center" fontWeight="bold" mb="20px">
              Report Data STO
            </Text>
            <Flex width="100%">
              {responseData.sto.length > 0 ? (
                <Bar options={barChartOption} data={stoMapping(responseData.sto)} />
              ) : (
                <Text mx="auto">Tidak Ada Data</Text>
              )}
            </Flex>
          </Flex>
        </Flex>
      )}
    </PageContainer>
  );
};

export default Performansi;
