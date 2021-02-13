import 'dotenv/config';
import HttpStatus from 'http-status';
import { format } from 'date-fns';
import pipedrive from 'pipedrive';
import DealsModel from '../models/deals';
import axios from 'axios';
import jsontoxml from 'jsontoxml';

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
});

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
  error: message,
}, statusCode);

const getAll = (dateFilter) => {
  const dateFormat = format(dateFilter, 'yyyy-MM-dd');
  return DealsModel.getAll({ date: dateFormat })
    .then(result => defaultResponse(result))
    .catch(error => errorResponse(error.message));
};

const prepareToInsertIntoBling = async (deals) => {
  const dealsList = [];
  for (const deal of deals) {
    const dealObj = {};
    dealObj.pedido = {
      data: deal?.add_time,
      cliente: {
        nome: deal?.person?.name
      },
      transporte: {
        volumes: {
          volume: {
            servico: 'sedex'
          }
        }
      },
      itens: {
        item: {
          descricao: deal?.title,
          qtde: deal?.value,
          vlr_unit: deal?.value
        }
      },
      parcelas: {
        parcela: {
          vlr: deal?.value
        }
      }
    };

    dealsList.push(dealObj);
  }

  return dealsList;
};

const insertIntoBling = async (deals) => {
  const promises = [];
  const config = {
    headers: { 'Content-Type': 'text/xml', 'apikey': process.env.BLING_KEY }
  };

  for (const deal of deals) {
    const xml = jsontoxml(deal);
    promises.push(axios.post(`${process.env.BLING_URL}/pedido/json/`, xml, config));
  }
  
  Promise.all(promises)
    .then(responses => console.log(responses));
}

const importDataToBling = async () => {
  const deals = pipedrive.DealsController;
  const dealsPipedrive = await deals.getAllDeals({ status: 'won' });

  if (!dealsPipedrive?.success) {
    return 'fail to connect';
  }

  if (!dealsPipedrive?.data) {
    return [];
  }

  const dataList = await prepareToInsertIntoBling(dealsPipedrive.data);
  await insertIntoBling(dataList);
}

const saveData = async (dateFilter) => {
  const dateFormat = format(dateFilter, 'dd/MM/yyyy');
  const config = {
    headers: { 'apikey': process.env.BLING_KEY }
  };

  const dealsBling = await axios.get(`${process.env.BLING_URL}/pedido/json/filters=dataEmissao[${dateFormat}]`, config);

  if (!dealsBling?.retorno?.pedidos) {
    return [];
  }

  const dealsResponse = dealsBling?.retorno?.pedidos;
  const totals = dealsResponse.reduce((acc, current) => acc + current, null);

  return DealsModel.insert({ date: dateFormat, total: totals })
    .then(result => result)
    .catch(error => error.message);
}

module.exports = {
  getAll,
  importDataToBling,
  saveData
};