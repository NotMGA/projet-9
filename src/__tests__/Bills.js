/**
 * @jest-environment jsdom
 */

import {screen, waitFor , fireEvent} from "@testing-library/dom"
import BillsUI from "../views/BillsUI.js"
import { bills } from "../fixtures/bills.js"
import { ROUTES_PATH} from "../constants/routes.js";
import {localStorageMock} from "../__mocks__/localStorage.js";
import userEvent  from "@testing-library/user-event"
import {ROUTES} from "../constants/routes.js"
import Router from "../app/Router.js";
import Bills from "../containers/Bills.js";
import store from "../__mocks__/store";

describe("Given I am connected as an employee", () => {
  describe("When I am on Bills Page", () => {
    /*
    test("Then bill icon in vertical layout should be highlighted", async () => {

      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      const root = document.createElement("div")
      root.setAttribute("id", "root")
      document.body.append(root)
      router()
      window.onNavigate(ROUTES_PATH.Bills)
      await waitFor(() => screen.getByTestId('icon-window'))
      const windowIcon = screen.getByTestId('icon-window')
      //to-do write expect expression
      //M.F
      expect (windowIcon.classList.contains('active-icon')).toBeTruthy();
      //M.F end

    })
    test("Then bills should be ordered from earliest to latest", () => {
      document.body.innerHTML = BillsUI({ data: bills })
      const dates = screen.getAllByText(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i).map(a => a.innerHTML)
      const antiChrono = (a, b) => ((a < b) ? 1 : -1)
      const datesSorted = [...dates].sort(antiChrono)
      expect(dates).toEqual(datesSorted)
    })
    //M.F
    describe("When i click on the eaye",()=>{
      test("It should open a modal ",()=>{
      const handleClickIconEye= jest.fn(bills.handleClickIconEye)
      const eaye = screen.getAllByTestId('icon-eye')
      console.log(eaye[1])
      // const handleClickIconEye = jest.fn((e) => bills.handleRefuseSubmit(e, bills[0]))
      eaye[1].addEventListener('click', handleClickIconEye(eaye[1]))
      userEvent.click(eaye[1])
      expect(handleClickIconEye).toHaveBeenCalled()
      expect(screen.getByText('Justificatif')).toBeTruthy()

      })
    })
    */

    describe("dfsfds",()=>{
      test("dfsdfsd",()=>{
       const html = BillsUI({ data : Bills , loading : true})
       document.body.innerHTML = html;
       expect(screen.queryByTestId("loading_test")).toBeTruthy()
      }) 
    })

    describe("dfsfds",()=>{
      test("btn new bill ",()=>{
        const html = BillsUI({ data : []})
        document.body.innerHTML = html;
        expect(screen.getByText("Mes notes de frais")).toBeTruthy()
        expect(screen.getByTestId("btn-new-bill")).toBeTruthy()

      })
    })
    // describe("When i click on new bill ",()=>{
    //   test("sdsds",()=>{
    //     const html = BillsUI({ data: bills })
    //     document.body.innerHTML = html;
    //     Object.defineProperty(window, 'localStorage', { value: {getItem :jest.fn(()=> null), setItem :jest.fn(()=> null) },writable : true
    //   })
    //   const wind = (past)=>{
    //     document.body.innerHTML = ROUTES({data : [] ,past})
    //   }
    //   const bded = jest.fn()
    //   const billss = new Bills({document,wind,bded,localStorage:window.localStorage})
    //   const handleClickNewBill = jest.fn(billss.handleClickNewBill)
    //   const btn_newbills = screen.getByTestId("btn-new-bill")
    //   btn_newbills.addEventListener("click",handleClickNewBill)
    //   fireEvent.click(btn_newbills)
    //   expect(handleClickNewBill).toHaveBeenCalled()

    //   })
    // })
    // end M.F

    test("Then bill icon in vertical layout should be highlighted", () => {
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      const user = JSON.stringify({
        type: 'Employee'
      })
      window.localStorage.setItem('user', user)
      Object.defineProperty(window, "location", {
        value: {
          hash: ROUTES_PATH["Bills"]
        }
      })

      document.body.innerHTML = `<div id="root"></div>`
      Router()
      const icon = screen.getByTestId('icon-window')

      expect(icon.classList.contains("active-icon")).toBeTruthy()
      
    })
    test("Then bills should be ordered from earliest to latest", () => {
      const html = BillsUI({ data: bills })
      document.body.innerHTML = html
      const dates = screen.getAllByText(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i).map(a => a.innerHTML)
      const antiChrono = (a, b) => ((a < b) ? 1 : -1)
      const datesSorted = [...dates].sort(antiChrono)
      expect(dates).toEqual(datesSorted)

    })
     test("Should give me Loading Page if loading is true", () => {
      const html = BillsUI({ data: bills, loading: true })
      document.body.innerHTML = html
      expect(screen.getByTestId("loading_test")).toBeTruthy()
    })
    test("Should give me error Page if loading is not defined ", () => {
      const html = BillsUI({ data: bills, error: true })
      document.body.innerHTML = html
      expect(screen.queryByTestId("error-message")).toBeTruthy()

    })

 test('Should give the good url when you press the button new Bills', () => {
      const html = BillsUI({ data: bills })
      document.body.innerHTML = html

      // on simule un localstorage
      Object.defineProperty(window, "localStorage", {
        value: { getItem: jest.fn(() => null), setItem: jest.fn(() => null) },
        writable: true
      })

      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ data: [], pathname });
      };
      const firebase = jest.fn()
      const bill = new Bills({ document, onNavigate, firebase, localStorage: window.localStorage })

      const handleClickNewBill = jest.fn(bill.handleClickNewBill);

      const btnNewBill = screen.getByTestId(`btn-new-bill`)
      btnNewBill.addEventListener("click", handleClickNewBill)

      fireEvent.click(btnNewBill)

      expect(handleClickNewBill).toHaveBeenCalled();
      expect(window.location.hash).toBe(ROUTES_PATH["Bills"]);

    })
    test('Should open modal when i click on que IconEye', () => {
      $.fn.modal = jest.fn()
      const html = BillsUI({ data: bills })
      document.body.innerHTML = html
      Object.defineProperty(window, "localStorage", { value: { getItem: jest.fn(() => null), setItem: jest.fn(() => null) } },
      )

      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ data: [], pathname });
      };
      const firebase = jest.fn()
      const bill = new Bills({ document, onNavigate, firebase, localStorage: window.localStorage })

      const handleClickIconEye = jest.fn(bill.handleClickIconEye);

      const iconsEye = screen.getAllByTestId(`icon-eye`)
      const firstEye = iconsEye[0]
      firstEye.addEventListener("click", handleClickIconEye(firstEye))
      userEvent.click(firstEye)

      expect(handleClickIconEye).toHaveBeenCalled()
      expect($.fn.modal).toHaveBeenCalled()

    })

    test('should lunch the download',()=>{
      const bill = new Bills({ document, onNavigate, localStorage: window.localStorage })

      const handleClickIconDownload = jest.fn(bill.handleClickIconDownload);

      const iconsDownload = screen.getAllByTestId(`icon-download`)
      const firstDownload = iconsDownload[0]
      firstDownload.addEventListener("click", handleClickIconDownload(firstDownload))
      userEvent.click(firstDownload)

      expect(handleClickIconDownload).toHaveBeenCalled()
    })

    test('Should display the new bill button', () => {

      const html = BillsUI({ data: [] })
      document.body.innerHTML = html

      expect(screen.getByText("Mes notes de frais")).toBeTruthy()
      expect(screen.getByTestId("btn-new-bill")).toBeTruthy()


    });


  });  });



 
describe("Given I am a user connected as Employee", () => {
  describe("When I navigate to Bills", () => {
  
    test("then bills from an API and fails with 404 message error", async () => {
      store.bills(() =>
        Promise.reject(new Error("Erreur 404"))
      );
      const html = BillsUI({ error: "Erreur 404" });
      document.body.innerHTML = html;
      const message = await screen.getByText(/Erreur 404/);
      expect(message).toBeTruthy();

    });
    test("then messages from an API and fails with 500 message error", async () => {
      store.bills(() =>
        Promise.reject(new Error("Erreur 500"))
      );
      const html = BillsUI({ error: "Erreur 500" });
      document.body.innerHTML = html;
      const MyMessage = await screen.getByText(/Erreur 500/);
      expect(MyMessage).toBeTruthy();

    });
  })
})
