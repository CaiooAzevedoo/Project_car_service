import { Model } from 'mongoose';
import Sinon from 'sinon';
import { expect } from 'chai';
import Car from '../../../src/Domains/Car';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/Car.service';

describe('Testa os serviços relacionados a Car', function () {
  // mocks
  const carInputMock: ICar = {
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.990,
    doorsQty: 4,
    seatsQty: 5,
  };

  const carOutputMock: Car = new Car({
    id: '6348513f34c397abcad040b2',
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.990,
    doorsQty: 4,
    seatsQty: 5,
  });

  const carListOutputMock: ICar[] = [
    {
      id: '634852326b35b59438fbea2f',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    },
    {
      id: '634852326b35b59438fbea31',
      model: 'Tempra',
      year: 1995,
      color: 'Black',
      status: undefined,
      buyValue: 39,
      doorsQty: 2,
      seatsQty: 5,
    },
  ];

  it('Testa se um carro é registrado com sucesso', async function () {
    // arrange
    Sinon.stub(Model, 'create').resolves(carOutputMock);
    // act
    const service = new CarService();
    const outPut = await service.createCar(carInputMock);
    // assert
    expect(outPut).to.be.deep.equal(carOutputMock);
  });

  it('Testa se é possível obter uma lista com todos os carros', async function () {
    // arrange
    Sinon.stub(Model, 'find').resolves(carListOutputMock);
    // act
    const service = new CarService();
    const outPut = await service.find();
    // assert
    expect(outPut).to.be.deep.equal(carListOutputMock);
  });

  it('Testa se é possível consultar um carro pelo id', async function () {
    // arrange
    Sinon.stub(Model, 'findById').resolves(carOutputMock);
    // act
    const service = new CarService();
    const outPut = await service.findCarById('6348513f34c397abcad040b2');
    // assert
    expect(outPut).to.be.deep.equal(carOutputMock);
  });

  it(
    'Testa se uma mensagem de error é retornada ao enviar um ID que não existe', 
    async function () {
      // arrange
      Sinon.stub(Model, 'findById').resolves({});
      // act
      try {
        const service = new CarService();
        await service.findCarById('1111222233330000ffffcccc');
      } catch (error) {
        // assert
        expect((error as Error).message).to.be.equal('Car not found');
      }
    },
  );

  it(
    'Testa se uma mensagem de error é retornada ao enviar um ID fora do padrão', 
    async function () {
      // arrange
      Sinon.stub(Model, 'findById').resolves({});
      // act
      try {
        const service = new CarService();
        await service.findCarById('11');
      } catch (error) {
        // assert
        expect((error as Error).message).to.be.equal('Invalid mongo id');
      }
    },
  );

  it('Testa se é possível alterar um carro', async function () {
    // arrange
    Sinon.stub(Model, 'update').resolves();
  });

  afterEach(function () {
    Sinon.restore();
  });
});