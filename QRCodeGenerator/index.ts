import {IInputs, IOutputs} from "./generated/ManifestTypes";
import { Encoder, ErrorCorrectionLevel } from "@nuintun/qrcode";



export class QRCodeGenerator implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  private _container: HTMLDivElement;
  private _image: HTMLImageElement;
  private _label:HTMLLabelElement
  
  QRCODE: string | null;
  notifyOutputChanged: () => void;
  /**
   * Empty constructor.
   */
  constructor() {}

  /**
   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
   * Data-set values are not initialized here, use updateView.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
   * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
   */
  public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
    container.setAttribute("class", "divmain");
    this._container = document.createElement("div");
    this._container.setAttribute("class", "divcont");
    this._image = document.createElement("img");
    this._label = document.createElement("label");
    this.notifyOutputChanged = notifyOutputChanged;
    // Add code to update control view

    var { TextToConvert } = context.parameters;
    const qrcode = new Encoder();
    qrcode.setEncodingHint(true);
    qrcode.setErrorCorrectionLevel(ErrorCorrectionLevel.H);
  

    if (TextToConvert.formatted) {
      const searchRegExp = /%%/g;
      const replaceWith = "\n";
      qrcode.write(TextToConvert.formatted.toString());
      qrcode.make();
      this.QRCODE = qrcode.toDataURL(10);
      this.notifyOutputChanged();
    }
    if (this.QRCODE) {
      this._image.src = this.QRCODE;
      this._container.appendChild(this._image);
       this._container.appendChild(this._label);
    }
    container.appendChild(this._container);
  }

  /**
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   */
  public updateView(context: ComponentFramework.Context<IInputs>): void {
    var { TextToConvert } = context.parameters;
    const qrcode = new Encoder();
    if (TextToConvert.formatted) {
      const searchRegExp = /%%/g;
      const replaceWith = "\n";
      qrcode.write(TextToConvert.formatted.toString());
      qrcode.make();
      this.QRCODE = qrcode.toDataURL(10);
      this.notifyOutputChanged();
      this._label.innerHTML = TextToConvert.formatted.toString();
    }
    if (this.QRCODE) {
      this._image.src = this.QRCODE;
    
    }
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
   */
  public getOutputs(): IOutputs {
    return { QRSVG: this.QRCODE || "" };
  }

  /**
   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
   */
  public destroy(): void {
    // Add code to cleanup control if necessary
  }
}
