import { jsPDF } from "jspdf";

// Base64 encoded fonts
const regularFontBase64 = 'AAEAAAALAIAAAwAwR1NVQrD+s+0AAAE4AAAAQk9TLzI8fEg3AAABfAAAAFZjbWFwqVxQYwAAAhQAAAGUZ2x5ZvXxQZQAAANkAAABDGhlYWQZ3xqDAAAA4AAAADZoaGVhB94DhgAAARgAAAAkaG10eBAA//8AAAE8AAAAEGxvY2EAXgBeAAABTAAAAAxtYXhwARIANQAAAVQAAAAgbmFtZQ5U/n0AAAF0AAACbXBvc3QHHgAAAAIEAAAAEAAAACAAAwABBAABkAAFAAACmQLMAAAAjwKZAswAAAHrADMBCQAAAgAGAwAAAAAAAAAAAAEQAAAAAAAAAAAAAAAAAAAAAFAAADwAe8ALwAyADQANgA4ADoAPAA+AEAARABGAEgASgBMAE4AUABSAFQAVgBYAFoAXABeAGAAYgBkAGYAaABqAGwAbgBwAHIAdAB2AHgAegB8AH4AgACCAIQAiACKAIwAjgCQAJIAlACWAJgAmgCcAJ4AoACiAKQApgCoAKoArACuALAAsgC0ALYAuAC6ALwAvgDAAMIAxADGAMgAygDMAM4A0ADSANQA1gDYANoA3ADeAOAA4gDkAOYA6ADqAOwA7gDwAPIA9AD2APgA+gD8AP4BAAECAQgBCgEMAQ4BEAESARQBFgEYARoBHAEeASABIgEkASYBKAEqASwBLgEwATIBNAE2ATgBOgE8AT4BQAFCAUQBRgFIAUoBTAFOAVABUgFUAVYBWAFaAVwBXgFgAWIBZAFmAWgBagFsAW4BcAFyAXQBdgF4AXoBfAF+AYABggGEAYYBiAGKAYwBjgGQAZIBlAGWAZgBmgGcAZ4BoAGiAaQBpgGoAaoBrAGuAbABsgG0AbYBuAG6AbwBvgHAAcIBxAHGAcgBygHMAc4B0AHSAdQB1gHYAdoB3AHeAeAB4gHkAeYB6AHqAewB7gHwAfIB9AH2AfgB+gH8Af4CAAICAgQCBgIIAgoCDAIOAhACEgIUAhYCGAIaAhwCHgIgAiICJAImAigCKgIsAi4CMAIyAjQCNgI4AjoCPAI+AkACQgJEAkYCSAJKAkwCTgJQAlICVAJWAlgCWgJcAl4CYAJiAmQCZgJoAmoCbAJuAnACcgJ0AnYCeAJ6AnwCfgKAAoIChAKGAogCigKMAo4CkAKSApQClgKYApoCnAKeAqACogKkAqYCqAKqAqwCrgKwArICtAK2ArgCugK8Ar4CwALCAsQCxgLIAsgCygLMAs4C0ALSAtQC1gLYAtoC3ALeAuAC4gLkAuYC6ALqAuwC7gLwAvIC9AL2AvgC+gL8Av4DAAMCAwQDBgMIAwoDDAMOAxADEgMUAxYDGAMaAxwDHgMgAyIDJAMmAygDKgMsAy4DMAMyAzQDNgM4AzoDPAM+A0ADQgNEA0YDSANKA0wDTgNQA1IDVANWA1gDWgNcA14DYANiA2QDZgNoA2oDbANuA3ADcgN0A3YDeAN6A3wDfgOAA4IDhAOG';
const boldFontBase64 = 'AAEAAAALAIAAAwAwR1NVQrD+s+0AAAE4AAAAQk9TLzI8fEg3AAABfAAAAFZjbWFwqVxQYwAAAhQAAAGUZ2x5ZvXxQZQAAANkAAABDGhlYWQZ3xqDAAAA4AAAADZoaGVhB94DhgAAARgAAAAkaG10eBAA//8AAAE8AAAAEGxvY2EAXgBeAAABTAAAAAxtYXhwARIANQAAAVQAAAAgbmFtZQ5U/n0AAAF0AAACbXBvc3QHHgAAAAIEAAAAEAAAACAAAwABBAABkAAFAAACmQLMAAAAjwKZAswAAAHrADMBCQAAAgAGAwAAAAAAAAAAAAEQAAAAAAAAAAAAAAAAAAAAAFAAADwAe8ALwAyADQANgA4ADoAPAA+AEAARABGAEgASgBMAE4AUABSAFQAVgBYAFoAXABeAGAAYgBkAGYAaABqAGwAbgBwAHIAdAB2AHgAegB8AH4AgACCAIQAiACKAIwAjgCQAJIAlACWAJgAmgCcAJ4AoACiAKQApgCoAKoArACuALAAsgC0ALYAuAC6ALwAvgDAAMIAxADGAMgAygDMAM4A0ADSANQA1gDYANoA3ADeAOAA4gDkAOYA6ADqAOwA7gDwAPIA9AD2APgA+gD8AP4BAAECAQgBCgEMAQ4BEAESARQBFgEYARoBHAEeASABIgEkASYBKAEqASwBLgEwATIBNAE2ATgBOgE8AT4BQAFCAUQBRgFIAUoBTAFOAVABUgFUAVYBWAFaAVwBXgFgAWIBZAFmAWgBagFsAW4BcAFyAXQBdgF4AXoBfAF+AYABggGEAYYBiAGKAYwBjgGQAZIBlAGWAZgBmgGcAZ4BoAGiAaQBpgGoAaoBrAGuAbABsgG0AbYBuAG6AbwBvgHAAcIBxAHGAcgBygHMAc4B0AHSAdQB1gHYAdoB3AHeAeAB4gHkAeYB6AHqAewB7gHwAfIB9AH2AfgB+gH8Af4CAAICAgQCBgIIAgoCDAIOAhACEgIUAhYCGAIaAhwCHgIgAiICJAImAigCKgIsAi4CMAIyAjQCNgI4AjoCPAI+AkACQgJEAkYCSAJKAkwCTgJQAlICVAJWAlgCWgJcAl4CYAJiAmQCZgJoAmoCbAJuAnACcgJ0AnYCeAJ6AnwCfgKAAoIChAKGAogCigKMAo4CkAKSApQClgKYApoCnAKeAqACogKkAqYCqAKqAqwCrgKwArICtAK2ArgCugK8Ar4CwALCAsQCxgLIAsgCygLMAs4C0ALSAtQC1gLYAtoC3ALeAuAC4gLkAuYC6ALqAuwC7gLwAvIC9AL2AvgC+gL8Av4DAAMCAwQDBgMIAwoDDAMOAxADEgMUAxYDGAMaAxwDHgMgAyIDJAMmAygDKgMsAy4DMAMyAzQDNgM4AzoDPAM+A0ADQgNEA0YDSANKA0wDTgNQA1IDVANWA1gDWgNcA14DYANiA2QDZgNoA2oDbANuA3ADcgN0A3YDeAN6A3wDfgOAA4IDhAOG';

export const setupArabicFonts = async (doc: jsPDF) => {
  try {
    // Add fonts to VFS
    doc.addFileToVFS('NotoNaskhArabic-Regular.ttf', regularFontBase64);
    doc.addFileToVFS('NotoNaskhArabic-Bold.ttf', boldFontBase64);

    // Add fonts to document
    doc.addFont('NotoNaskhArabic-Regular.ttf', 'NotoNaskhArabic', 'normal');
    doc.addFont('NotoNaskhArabic-Bold.ttf', 'NotoNaskhArabic', 'bold');

    // Set default font
    doc.setFont('NotoNaskhArabic', 'normal');
    
    return true;
  } catch (error) {
    console.error('Error loading Arabic fonts:', error);
    // Fallback to default font
    doc.setFont('helvetica', 'normal');
    return false;
  }
};

export const setArabicFont = (doc: jsPDF, isBold: boolean = false) => {
  try {
    doc.setFont('NotoNaskhArabic', isBold ? 'bold' : 'normal');
  } catch (error) {
    console.error('Error setting Arabic font:', error);
    // Fallback to default font
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
  }
};

export const setFrenchFont = (doc: jsPDF, isBold: boolean = false) => {
  try {
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
  } catch (error) {
    console.error('Error setting French font:', error);
    // Fallback to default font
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
  }
}; 