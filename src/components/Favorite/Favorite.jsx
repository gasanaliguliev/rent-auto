import { Section } from '../../components/CatalogList/CatalogList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectFavorite } from '../../redux/selectors';
import {
  Button,
  CarDetails,
  CatalogImage,
  CatalogItem,
  List,
  ModalBtn,
  ModalIMG,
  Model,
  RentalConditionItem,
  RentalConditionList,
  StyleModal,
} from './Favorite.styled';
import { AiFillHeart, AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';
import { removeFromFavorite } from '../../redux/operations';
import { ToastContainer } from 'react-toastify';

const Favorite = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cityCar, setCityCar] = useState('');
  const [modalCar, setModalCar] = useState('');
  const favoriteCars = useSelector(selectFavorite);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  function modalOpen(id) {
    let carChoice = favoriteCars.find(car => car.id === id);
    setModalCar(carChoice);
    const indexCar = carChoice.address.indexOf(',');
    const cityCar = carChoice.address.slice(indexCar + 2);
    const city = cityCar.split(',', 1);
    setCityCar(city);
    setIsOpen(true);
    document.body.style.overflowY = 'hidden';
  }

  function modalClose() {
    setIsOpen(false);
    document.body.style.overflowY = 'unset';
  }

  function deleteCar(id) {
    dispatch(removeFromFavorite(id));
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {favoriteCars.length !== 0 ? (
        <Section>
          <List>
            {favoriteCars &&
              !error &&
              favoriteCars.map(
                ({
                  id,
                  img,
                  make,
                  model,
                  year,
                  rentalPrice,
                  address,
                  rentalCompany,
                  type,
                  mileage,
                  functionalities,
                }) => {
                  const index = address.indexOf(',');

                  return (
                    <CatalogItem key={id}>
                      <CatalogImage src={img} alt={make} />
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Model>
                          {make} {model}, {year}
                        </Model>
                        <Model>{rentalPrice}</Model>
                      </div>
                      <CarDetails>
                        {address.slice(index + 2).split(',', 1)} | Ukraine |{' '}
                        {rentalCompany} | {type} |{' '}
                        {mileage.toLocaleString('de-DE')} | {functionalities[0]}
                      </CarDetails>
                      <Button type="button" onClick={() => modalOpen(id)}>
                        Learn more
                      </Button>
                      <AiFillHeart
                        size={18}
                        color="#3470FF"
                        style={{
                          padding: '5px',
                          position: 'absolute',
                          top: '14px',
                          right: '14px',
                          cursor: 'pointer',
                        }}
                        onClick={() => deleteCar(id)}
                      />
                    </CatalogItem>
                  );
                }
              )}
          </List>
        </Section>
      ) : (
        <h1 style={{ textAlign: 'center', paddingTop: 80, paddingBottom: 180 }}>
          NO cars in favorite :( please add first car from catalog :)
        </h1>
      )}

      <StyleModal
        isOpen={isOpen}
        ariaHideApp={false}
        onRequestClose={modalClose}
        style={{
          overlay: {
            backgroundColor: 'rgba(18, 20, 23, 0.5)',
          },
        }}
      >
        <ModalIMG src={modalCar.img} alt={modalCar.make} />
        <p
          style={{
            fontSize: '18px',
            fontWeight: 500,
            fontFamily: 'Manrope',
            marginBottom: 8,
          }}
        >
          {modalCar.make}{' '}
          <span style={{ color: '#3470FF' }}>{modalCar.model}</span>,{' '}
          {modalCar.year}
        </p>
        <p
          style={{
            fontFamily: 'Manrope',
            fontSize: '12px',
            color: 'rgba(18, 20, 23, 0.5)',
            marginBottom: 4,
            lineHeight: 1.5,
          }}
        >
          {cityCar} | {`Ukraine`} | {`Id: ${modalCar.id}`} |{' '}
          {`Year: ${modalCar.year}`} | {`Type: ${modalCar.type}`}
        </p>
        <p
          style={{
            fontFamily: 'Manrope',
            fontSize: '12px',
            color: 'rgba(18, 20, 23, 0.5)',
            marginBottom: 12,
          }}
        >
          {`Fuel Consumption: ${modalCar.fuelConsumption}`} |{' '}
          {`Engine Size: ${modalCar.engineSize}`}
        </p>
        <p
          style={{
            fontFamily: 'Manrope',
            fontSize: 14,
            color: '#121417',
            marginBottom: 16,
            lineHeight: 1.42,
          }}
        >
          {modalCar.description}
        </p>
        <h3 style={{ fontSize: 14, marginBottom: 8, fontFamily: 'Manrope' }}>
          Accessories and functionalities:
        </h3>
        <p
          style={{
            fontFamily: 'Manrope',
            fontSize: '12px',
            color: 'rgba(18, 20, 23, 0.5)',
          }}
        >
          {modalCar.accessories}
        </p>
        <p
          style={{
            fontFamily: 'Manrope',
            fontSize: '12px',
            color: 'rgba(18, 20, 23, 0.5)',
            marginBottom: 16,
          }}
        >
          {modalCar.functionalities}
        </p>
        <h3 style={{ fontSize: 14, fontFamily: 'Manrope', marginBottom: 8 }}>
          Rental Conditions:{' '}
        </h3>
        <RentalConditionList>
          <RentalConditionItem>
            {`Minimum age:`}{' '}
            <span
              style={{
                color: '#3470FF',
                fontFamily: 'Montserrat',
                fontWeight: 600,
              }}
            >
              {modalCar && modalCar.rentalConditions.slice(13, 15)}
            </span>
          </RentalConditionItem>
          <RentalConditionItem>
            {modalCar && modalCar.rentalConditions.slice(16, 38)}
          </RentalConditionItem>
          <RentalConditionItem>
            {modalCar && modalCar.rentalConditions.split('\n').pop()}
          </RentalConditionItem>
          <RentalConditionItem>
            {`Mileage:`}{' '}
            <span
              style={{
                color: '#3470FF',
                fontFamily: 'Montserrat',
                fontWeight: 600,
              }}
            >
              {modalCar && modalCar.mileage.toLocaleString('en-IN')}
            </span>
          </RentalConditionItem>
          <RentalConditionItem>
            {`Price`}{' '}
            <span
              style={{
                color: '#3470FF',
                fontFamily: 'Montserrat',
                fontWeight: 600,
              }}
            >
              {modalCar.rentalPrice}
            </span>
          </RentalConditionItem>
        </RentalConditionList>
        <ModalBtn type="button">Rental car</ModalBtn>
        <AiOutlineClose
          onClick={modalClose}
          size={24}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            cursor: 'pointer',
          }}
        />
      </StyleModal>
    </>
  );
};

export default Favorite;